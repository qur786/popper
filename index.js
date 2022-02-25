import figlet from "figlet";
import chalk from "chalk";
import clear from "clear";
import { Command } from "commander";
import { isDirectoryExists, getCurrentDirectoryBase } from "./lib/files.js";
import { setStoredGithubCredentials, getStoredGithubToken } from "./lib/github-credentials.js";
import { createRemoteRepository } from "./lib/create-a-repo.js";

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
        await setStoredGithubCredentials(token);
    });

CLI
    .command("build")
    .description("Create a Git hub remote repo")
    .action(async () => {
        const token = getStoredGithubToken();
        const respositoryResponse = await createRemoteRepository(token);
        console.log(respositoryResponse.data.ssh_url);
    })
    
CLI.parse(process.argv);

if ( !CLI.args.length ) {
    CLI.help();
}