"use strict";

const fs = require("fs");
const readline = require('readline');
const LogLine = require("./LogLine");

const HEROKU_SCHEDULER_LOG  = "heroku-scheduler.log";
const HEROKU_API_LOG        = "heroku-api.log";
const HEROKU_POSTGRES_LOG   = "heroku-postgres.log";
const HEROKU_ROUTER_LOG     = "heroku-router.log";
const HEROKU_STATISTIC_LOG  = "heroku-statistic-%NO.log";
const HEROKU_APP_LOG        = "heroku-app-%NO.log";

class SplitCommand {

  run(argv) {
    const input = argv._[0];
    const output = argv._[1] || "output";

    if (!input) {
      console.error("Input file is not specified");
      return;
    }
    this.doRun(input, output);
  }

  doRun(input, output) {
    const fileMap = {};

    const rs = fs.createReadStream(input);
    const rl = readline.createInterface(rs, {});

    rl.on("line", data => {
      const log = new LogLine(data);
      const filename = output + "/" + this.getFilename(log);

      let os = fileMap[filename];
      if (!os) {
        console.log(filename);
        os = fs.createWriteStream(filename, {'flags': 'a'});
        fileMap[filename] = os;
      }
      os.write(`${log.getGeneratedAt()} ${log.getMessage()}\n`);
    });
    rl.on("close", () => {
      Object.keys(fileMap).forEach(key => {
        fileMap[key].end();
      })
    });
  }

  getFilename(log) {
    const pgm = log.getProgram();
    if (pgm.indexOf("scheduler") !== -1) {
      return HEROKU_SCHEDULER_LOG;
    }
    if (pgm === "app/api") {
      if (log.getMessage().indexOf("scheduler") !== -1) {
        return HEROKU_SCHEDULER_LOG;
      } else {
        return HEROKU_API_LOG;
      }
    }
    if (pgm.indexOf("postgres") !== -1) {
      return HEROKU_POSTGRES_LOG;
    }
    if (pgm === "heroku/router") {
      return HEROKU_ROUTER_LOG;
    }
    if (pgm.indexOf("heroku/web") !== -1) {
      return HEROKU_STATISTIC_LOG.replace("%NO", pgm.split(".").pop());
    }
    if (pgm.indexOf("app/web") !== -1) {
      return HEROKU_APP_LOG.replace("%NO", pgm.split(".").pop());
    }
    return `${pgm}-${log.getSourceName()}-${log.getSourceIp()}.log`;
  }

}

module.exports = new SplitCommand();