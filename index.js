const minimist = require('minimist');
const fs = require('fs');
const cli = require('./cli-commands');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    const cmd = args._[0];
    
    if (cli.commands) {
        let cmdObj = {};
        cli.commands.every((ele) => {
            if (ele.name == cmd) {                
                cmdObj = ele;
                return false;
            }
            
            return true;
        });

        if(cmdObj){
            require(cmdObj.main) (args);
        }
        
    }

}