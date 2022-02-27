import fs from "fs";
import path from "path";
import process from "process";
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
    const currentDirectory = process.cwd();
    console.log(currentDirectory, path.join(currentDirectory, ".git"));
    // const isDir = files.isDirectoryExists(currentDirectory);
    // // let isGit;
    // if ( isDir === false) {
    //     console.log(chalk.red("Oooops! Directory does not exist."));
    //     process.exit();
    // }
    // } else {
    //     isGit = fs.statSync(".git").isFile();
    //     if (isGit) {
    //         console.log(chalk.red("Oooops! The directory is already a git repo."));
    //         process.exit();
    //     }
    // }
    return fs.statSync(".git").isFile()
}