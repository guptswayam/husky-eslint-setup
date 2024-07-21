import configureLogger from "./configure-logger.js";

class Logger {
  constructor(processName) {
    configureLogger(processName);
  }

  info(...args) {
    this.log("INFO", args.join(" "));
  }

  warrn(...args) {
    this.log("WARN", args.join(" "));
  }

  error(...args) {
    this.log("WARN", args.join(" "));
  }

  log(logLevel, data) {
    const callerDetails = this.getCallerFnDetails(4);
    const time = new Date().toISOString();

    process.stdout
      .write(
        time +
          " " +
          callerDetails.filePath +
          " " +
          callerDetails.functionName +
          " " +
          (typeof data === "string" ? data : JSON.stringify(data)) +
          "\n",
        logLevel
      )
      .then();
  }

  getCallerFnDetails(callerIndex) {
    const e = new Error();
    // eslint-disable-next-line
    const regex = /(?<=at )([a-zA-Z0-9\._]*)|(?<=\/src\/)(.*)/g;
    const matches = e.stack.split("\n")[callerIndex].match(regex);
    return {
      filePath: matches[1],
      functionName: matches[0],
    };
  }
}

export default Logger;
