import inquirer from "inquirer";
import { getCurrentDirectoryBase } from "./files.js";
// import minimist from "minimist";

export const enterRepositoryInformations = () => {
    // const argv = new minimist(process.argv.slice(2));
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