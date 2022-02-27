import simpleGit from "simple-git";
import loadash from "lodash";
import fs from "fs";
import chalk from "chalk";
import { enterRepositoryInformations, askGitignoreFiles } from "./inquirer.js";
import { createOctoApp } from "./github-credentials.js"
import { isGitRepo } from "./files.js";

export const createRemoteRepository = async (token) =>{
    let response;
    try {
        const octo = await createOctoApp(token)
        const repoInformation = await enterRepositoryInformations();
        response = await octo.rest.repos.createForAuthenticatedUser({
            name: repoInformation.name,
            description: repoInformation.description,
            private: repoInformation.visibility === "private",
        });
    } catch (error) {
        switch(error.status) {
            case 422:
                console.log(chalk.red("Couldn't create the Repo, There is already a Repo with the same name."));
                break;
            default:
                console.log(chalk.red("Git Hub Server Error"));
        }
    }
    return response
}

export const generateGitignore = async () => {
    const fileList = loadash.without(fs.readdirSync("."), ".git", ".gitignore");
    fs.writeFileSync(".gitignore", "node_modules");
    if (fileList.length > 0) {
        const ignoreFilesLists = await askGitignoreFiles(fileList);
        if (ignoreFilesLists.ignore.length > 0) {
            fs.writeFileSync(".gitignore", ignoreFilesLists.ignore.join("\n"));
        }
    }
}

export const setupRepository = async (url) => {
    const isGit = isGitRepo();
    console.log(isGit);
    if (isGit) {
        console.log(chalk.red("Oooops! The directory is already a git repo."));
        process.exit();
    }
    const git = simpleGit();
    try {
        await git
                .init()
                .add(".gitignore")
                .add("./*")
                .commit("initial commit")
                .addRemote("origin", url)
                .push("origin", "master");
            return true;
    } catch (error) {
        throw error;
    }
}