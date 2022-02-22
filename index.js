import figlet from "figlet";
import chalk from "chalk";
import clear from "clear";
import { Command } from "commander";
import { isDirectoryExists, getCurrentDirectoryBase } from "./lib/files.js";

const CLI = new Command();

CLI
    .command("start")
    .description("Start Popper")
    .action(() => {
        clear();
        console.log(chalk.magenta(figlet.textSync("Popper", {
            horizontalLayout: "default",
            verticalLayout: "default",
        })))
    });

CLI.parse(process.argv);

if ( !CLI.args.length ) {
    CLI.help();
}