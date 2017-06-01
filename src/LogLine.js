"use strict";

class LogLine {
  constructor(line) {
    this.array = line.split("\t");
  }

  getId() { return this.array[0];}
  getGeneratedAt() { return this.array[1];}
  getRecievedAt() { return this.array[2];}
  getSourceId() { return this.array[3];}
  getSourceName() { return this.array[4];}
  getSourceIp() { return this.array[5];}
  getFacilityName() { return this.array[6];}
  getSeverityName() { return this.array[7];}
  getProgram() { return this.array[8];}
  getMessage() { return this.array[9];}
}

module.exports = LogLine;
