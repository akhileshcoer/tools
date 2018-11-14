const inquirer = require('inquirer');
const file = require('../lib/files');
const chalk = require("chalk");

module.exports = {

    askInput: () => {

        console.log(chalk.green('This command will help in finding nuget packages required to sonar nuget-releases repository.'));
        console.log('');
        console.log(chalk.blue('Perform below steps before using this command:'));
        console.log(chalk.blue('1. Clean nuget packages folder and ensure solution builds successfully using sonar nuget-public repository'));
        console.log(chalk.blue('2. Rename this package to "packages.old"'));
        console.log(chalk.blue('3. Now set nuget to use only sonar nuget-releases repository. It will automatically create a new packages folder.'));
        console.log('');

        const questions = [
            {
                name: 'FromFolder',
                type: 'input',
                message: 'Path for source package folder (step#2):',
                validate: function (value) {
                    if (value.length && file.directoryExists(value)) {
                        return true
                    } else {
                        return 'Enter path for source package folder (step#2).';
                    }
                }
            },
            {
                name: 'ToFolder',
                type: 'input',
                message: 'Path for desitnation package folder (step#3):',
                validate: function (value) {
                    if (value.length && file.directoryExists(value)) {
                        return true;
                    } else {
                        return 'Enter path for desitantion package folder (step#3).';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }
}