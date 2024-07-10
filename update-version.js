import * as yaml from "js-yaml";
import * as fs from "fs";

// Read the swagger.yaml file
const filePath = "swagger.yaml";
const swaggerFile = fs.readFileSync(filePath, "utf8");
const swaggerDoc = yaml.load(swaggerFile);

// Get the new version from the command line arguments
const newVersion = process.argv[2];

if (!newVersion) {
  console.error("Please provide the new version as an argument.");
  process.exit(1);
}

// Update the version in the swagger document
swaggerDoc.info.version = newVersion;

// Write the updated swagger.yaml file
fs.writeFileSync(filePath, yaml.dump(swaggerDoc, { lineWidth: -1 }), "utf8");

console.log(`Updated swagger.yaml version to ${newVersion}`);
