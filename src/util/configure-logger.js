import * as fs from "fs";

/** process.stdout.write method implemention, https://github.com/nodejs/node/blob/75fe4f35d4e560f7e98a3be2ca233342532873c0/lib/internal/streams/writable.js#L502
Writable.prototype.write = function(chunk, encoding, cb) {
  if (encoding != null && typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  return _write(this, chunk, encoding, cb) === true;
};
 */

function configureLogger(processName) {
  process.stdout.write = function (chunk, logLevel) {
    let fileDifferentiator;

    switch (logLevel) {
      case "ERROR":
        fileDifferentiator = "error";
        break;
      case "WARN":
        fileDifferentiator = "warn";
        break;
      default:
        fileDifferentiator = "info";
        break;
    }

    let date = new Date().toLocaleString("en-US", { dateStyle: "short" });
    date = date.replace(/\//g, "-");

    const filename = `${processName}_${date}_${fileDifferentiator}.log`; // log file rotation for each new date

    return new Promise((resolve) => {
      fs.appendFile(filename, chunk, (err) => {
        if (!err) resolve(true);
        else resolve(false);
      });
    });
  };
}

export default configureLogger;
