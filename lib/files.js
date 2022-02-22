import fs from "fs";
import path from "path";

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