
const fs = require('fs');
const glob = require('glob');
var path = require('path');
const chalk = require("chalk");

module.exports = {

    readDirectory: (folderPath, map) => {

        return new Promise((resolve, reject) => {

            glob('**/*.nupkg', { cwd: folderPath }, (err, items) => {

                if (err) {
                    console, log(err);
                    reject(err);
                }

                for (var i = 0; i < items.length; i++) {
                    map.set(items[i], path.join(folderPath, items[i]));
                }

                resolve(map);
            });
        });

    },

    findDelta: async (sourceFolder, destinationFolder) => {

        let nugetPackages = [];
        try {
            const destinationFolderMap = await module.exports.readDirectory(destinationFolder, new Map());
            const sourceFolderMap = await module.exports.readDirectory(sourceFolder, new Map());
            sourceFolderMap.forEach((val, key) => {
                if (!destinationFolderMap.has(key)) {
                    nugetPackages.push(val);
                }
            });

            if (nugetPackages.length === 0) {
                console.log(chalk.blue('No changes found'));
                return;
            }
            const directory = path.join(destinationFolder, 'diff-packages' + (new Date()).getTime().toString());
            fs.mkdirSync(directory);

            nugetPackages.forEach((val) => {
                fs.createReadStream(val).pipe(fs.createWriteStream(path.join(directory, path.basename(val))));
            });

            console.log(chalk.green('Delta nuget packages are at : ' + directory));
            return;

        } catch (error) {
            console.log(error);
        }
    },
}