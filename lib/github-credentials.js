import Configstore from "configstore";
import fs from "fs";
import { Octokit } from "octokit";
import loadash from "lodash";
import { askGithubCredentials } from "./inquirer.js";

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const config = new Configstore(packageJson.name);
const octo = new Octokit();
export const getOctoInstance = () => {
    return new Octokit();
};

export const createOctoApp = async (accessToken) => {
    let octo;
    try {
        octo = new Octokit({
            auth: accessToken,
        });
    } catch(error) {
        throw new Error("Invalid token", "Please enter a valid access token");
    }
    return octo;
};

export const getStoredGithubToken = () => {
    return config.get("github-credentials.token");
};

export const setStoredGithubCredentials = async (token) => {
    if (accessToken) {
        config.set("github-credentials.token", accessToken);
        return accessToken;
    } else {
        throw new Error("enter github access token with proper scopes enabled");
    }
    
};