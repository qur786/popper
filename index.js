import figlet from "figlet";
import chalk from "chalk";
import clear from "clear";
import { Command } from "commander";
import { isDirectoryExists, getCurrentDirectoryBase } from "./lib/files.js";
import { setStoredGithubCredentials, createOctoApp } from "./lib/github-credentials.js";

const CLI = new Command();

CLI
    .command("start")
    .description("Start Popper")
    .argument("<token>", "Github Access Token")
    .action(async (token) => {
        clear();
        console.log(chalk.magenta(figlet.textSync("Popper", {
            horizontalLayout: "default",
            verticalLayout: "default",
        })))
        const res = await createOctoApp(token);
        await setStoredGithubCredentials(token);
    });
    
CLI.parse(process.argv);

if ( !CLI.args.length ) {
    CLI.help();
}