import fs from "fs";
import path from "path";
import chalk from "chalk";

export const getCurrentDirectoryBase = () => {
    return path.basename(process.cwd());
};

export const isDirectoryExists = (filePath) => {
    let isExist = false;
    try {
        isExist = fs.statSync(filePath).isDirectory();
    } catch {
        isExist = false;
    } finally {
        return isExist;
    }
};

export const isGitRepo = () => {
    const isGit = files.isDirectoryExists();
    if ( isGit === false) {
        console.log(chalk.red("Oooops! already a Git repository"));
        process.exit();
    }
}