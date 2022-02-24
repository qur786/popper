import inquirer from "inquirer";
import { getCurrentDirectoryBase } from "./files.js";

export const enterRepositoryInformations = () => {
    const questions = [
        {
            name: "name",
            type: "input",
            message: "enter the name of your repository",
            default: getCurrentDirectoryBase(),
            validate: (repository) => {
                if(repository) {
                    return true;
                } else {
                    throw new Error("Repository Name Error", "Enter Repository name");
                }
            }
        },
        {
            name: "description",
            type: "input",
            message: "enter description for your repository:",
        },
        {
            name: "visibility",
            type: "list",
            message: "enter the name of your repository:",
            choices: ["private", "public"],
            default: "public"
        },
    ];
    return inquirer.prompt(questions);
}

export const askGitignoreFiles = (fileList) => {
    const questions = [
        {
            name: "ignore",
            type: "checkbox",
            message: "chhose which files to put in .gitignore",
            choices: fileList,
            default: ["node_modules"]
        }
    ];
    return inquirer.prompt(questions);
}