const readline = require('readline-sync');
const state = require('./state.js');
module.exports = function (){
    const content = {
        maximumSentences : 3,
        searchTerm : askReturnSearchTerm(),
        askPrefeix : askReturnPrefix()
    };
    
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