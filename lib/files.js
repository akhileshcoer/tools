const fs = require('fs');
const path = require('path');
const isJson = require('is-json');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (directoryPath) => {
        try {
            return fs.statSync(directoryPath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    fileExists: (filePath) => {
        try {
            return fs.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }
    },

    isJsonFile: (item) => {        
        return isJson(item);
    },

    readFileSync: (filePath) => {
        return fs.readFileSync(filePath, 'utf8');
    }
};