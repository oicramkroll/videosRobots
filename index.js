const readline = require('readline-sync');
function start(){
    const content = {};
    content.searchTerm = askReturnSearchTerm();
    function askReturnSearchTerm(){
        return readline.question("qual o termo de busca?");
    }
    console.log(content);
}
start();