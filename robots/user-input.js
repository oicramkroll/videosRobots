const readline = require('readline-sync');
const state = require('./state.js');
module.exports = function (content){
    content.searchTerm = askReturnSearchTerm();
    content.askPrefeix = askReturnPrefix();
    state.seve(content);

    function askReturnSearchTerm(){
        return readline.question("qual o termo? ");
    }
    function askReturnPrefix(){
        const prefixes = ['quem e?','o que e?','a historia de.'];
        const selectedPrefix = readline.keyInSelect(prefixes,'qual o prefixo');
        return prefixes[selectedPrefix];
    }
};