process.on("uncaughtException", (err) => {
  process.stdout.write(err.stack + "\n", "ERROR").then(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (reason) => {
  process.stdout.write(JSON.stringify(reason) + "\n", "ERROR").then(() => {
    process.exit(1);
  });
});
