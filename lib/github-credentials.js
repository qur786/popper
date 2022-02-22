import Configstore from "configstore";
import fs from "fs";

const packageJson = JSON.parse(fs.readFileSync("../package.json", "utf-8"));
const config = new Configstore(packageJson.name);