import fs from "fs";
import path from "path";
import process from "process";

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
    return isDirectoryExists(path.join(currentDirectory, ".git"));
}