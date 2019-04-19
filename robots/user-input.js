const readline = require('readline-sync');
function robot(content){
    content.searchTerm = askReturnSearchTerm();
    content.askPrefeix = askReturnPrefix();
    function askReturnSearchTerm(){
        return readline.question("qual o termo? ");
    }
    function askReturnPrefix(){
        const prefixes = ['quem e?','o que e?','a historia de.'];
        const selectedPrefix = readline.keyInSelect(prefixes,'qual o prefixo');
        return prefixes[selectedPrefix];
    }
}
module.exports = robot;