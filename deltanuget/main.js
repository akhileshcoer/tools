const inquirer = require('./inquirer');
const figlet = require("figlet");
const chalk = require("chalk");
const deltaNuget = require('./delta');

module.exports = async (args) => {
  console.log(
    chalk.green(
      figlet.textSync("Delta Nuget", {
        horizontalLayout: "default",
        verticalLayout: "default"
      })));

  const packageFolders = await inquirer.askInput();
  await deltaNuget.findDelta(packageFolders.FromFolder, packageFolders.ToFolder);
};