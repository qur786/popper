import figlet from "figlet";
import chalk from "chalk";
import clear from "clear";
import { Command } from "commander";
import { setStoredGithubCredentials, getStoredGithubToken } from "./lib/github-credentials.js";
import { createRemoteRepository, generateGitignore, setupRepository } from "./lib/create-a-repo.js";

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
        console.log(token);
        try {
            const respositoryResponse = await createRemoteRepository(token);
            await generateGitignore();
            const setup = await setupRepository(respositoryResponse.data.ssh_url);
            if (setup) {
                console.log(chalk.green("Yoooohooooo! Repository created."))
            }
        } catch (error) {
            console.log(error.status);
        }
    })
    
CLI.parse(process.argv);

if ( !CLI.args.length ) {
    CLI.help();
}