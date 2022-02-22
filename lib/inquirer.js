import inquirer from "inquirer";
import minimist from "minimist";

export const askGithubCredentials = () => {
    const questions = [
        {
            name: "username",
            type: "email",
            message: "Enter your Github username or email-id",
            validate: function (data) {
                if (data.length > 0) {
                    return true;
                } else {
                    return `Please enter your username or email-id`;
                }
            }
        },
        {
            name: "password",
            type: "password",
            message: "Enter your Github password",
            validate: function (data) {
                if (data.length > 0) {
                    return true;
                } else {
                    return `Please enter your password`;
                }
            }
        }
    ]
    return inquirer.prompt(questions);
}