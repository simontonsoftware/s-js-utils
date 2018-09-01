import { writeFileSync } from "fs";
import { format } from "prettier";

const libName = "s-js-utils";
const packageJson = require("./package.json");
const libPackageJson = require(`./projects/${libName}/package.json`);
writeFileSync(
  `./projects/${libName}/package.json`,
  format(JSON.stringify({ ...libPackageJson, version: packageJson.version }), {
    parser: "json",
  }),
);
