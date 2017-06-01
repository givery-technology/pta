"use strict";

const command = process.argv[2];
const argv = require('minimist')(process.argv.slice(3));

const USAGE = `
pta - Papertrail Log Analyzer

subcommand: 
  - split INPUTFILENAME [OUTPUT_DIR]
`


switch (command) {
  case "split":
    require("./src/Split").run(argv);
    break;
  default:
    console.error("Unknown command: " + command);
    showUsage();
}

function showUsage() {
  console.error(USAGE);
}

