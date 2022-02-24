import inquirer from "inquirer";
import minimist from "minimist";

export const askGithubCredentials = () => {
    const questions = [];
    return inquirer.prompt(questions);
}