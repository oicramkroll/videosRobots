const content = {
    searchTerm:"",
    prefix:"",
    sourceContentOriginal:"",
    sourceContentSinitized:"",
    sentences:[
        {
            text:"",
            keyWords:[],
            images:[]
        }
    ]
};
const readline = require('readline-sync');
function start(){
    const content = {};
    content.searchTerm = askReturnSearchTerm();
    content.askPrefeix = askReturnPrefix();
    function askReturnSearchTerm(){
        return readline.question("qual o termo? ");
    }
    function askReturnPrefix(){
        const prefixes = ["quem e?","o que e?","a historia de."];
        const selectedPrefix = readline.keyInSelect(prefixes,"qual o prefixo");
        return prefixes[selectedPrefix];
    }
    console.log(content);
}
start();