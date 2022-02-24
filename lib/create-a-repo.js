import simpleGit from "simple-git";
import loadash from "lodash";
import fs from "fs";
import { enterRepositoryInformations, askGitignoreFiles } from "./inquirer.js";
import { createOctoApp } from "./github-credentials.js"

export const createRemoteRepository = async (token) =>{
    const octo = await createOctoApp(token)
    let response;
    try {
        const repoInformation = await enterRepositoryInformations();
        console.log(repoInformation);
        response = await octo.rest.repos.createForAuthenticatedUser({
            name: repoInformation.name,
            description: repoInformation.description,
            private: repoInformation.visibility === "private",
        });
    } catch (error) {
        throw new Error("Repository Creation Error", "Repository cannot be created");
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