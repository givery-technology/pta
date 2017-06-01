# PTA
PaperTrail Log analyzer.

Analyze archived papertrail log.

This app also supports application on Heroku.


## Install
If you want to use this app as global module, you can use `npm install`

```
$ npm install -g .
```

## Sub command
### split
Split specified log to multiple files.

```
pta split INPUT_FILENAME [OUTPUT_DIR]
```

- INPUT_FILENAME: Required. File path for input papertrail log file.
- OUTPUT_DIR: Optional. Output directory for splitted files.

Example

```
$ pta split 2017-05-31.tsv output
```

It makes follwoing files

- heroku-scheduler.log - Heroku scheduler related logs
- heroku-api.log - Heroku API call related logs
- heroku-postgres.log - Heroku Postgres related logs
- heroku-router.log - Heroku Access log
- heroku-statistic-[n].log - Heroku statistics related logs per instance.
- heroku-app-[n].log - Heroku application related logs per instance.

If the log is not heroku related, it makes following files.

- `${program}-${source_name}-${source_ip}.log`
