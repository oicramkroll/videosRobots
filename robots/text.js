const algorithmia = require('algorithmia');
const credentialAlgorithimia = require('../credentials/algorithmia.json');

async function robot(content){
    await fetchContetFromWikiPedia(content);
    //sanitizeContent(content);
    //breakContentIntoSenteces(content);
    async function fetchContetFromWikiPedia(content){
        const clientAlgorithmia = algorithmia(credentialAlgorithimia.apikey);
        const result = await clientAlgorithmia
        .algo("web/WikipediaParser/0.1.2?timeout=300")
        .pipe({
            "articleName": content.searchTerm,
            "lang": "en"
        });

        content.sourceContentOriginal = result.get().content;
        //console.log(result.get());
    }
}
module.exports = robot;