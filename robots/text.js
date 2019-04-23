const algorithmia = require('algorithmia');
const credentialAlgorithimia = require('../credentials/algorithmia.json');
const sentenceBoundaryDetection = require('sbd');

async function robot(content){
    await fetchContetFromWikiPedia(content);
    sanitizeContent(content);
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

    function sanitizeContent(content){
        content.sourceContentSinitized = content.sourceContentOriginal.split('\n')
        .filter((line)=>{
            if(line.trim().length === 0 || line.trim().startsWith('=')) return false;
            return true;
        })
        .join(' ')
        .replace(/\((?:\([^()]*\)|[^()])*\)/gm, '')
        .replace(/  /g,' ')
        .replace(/\'s/g,'');

        content.sentences = [];
        sentenceBoundaryDetection.sentences(content.sourceContentSinitized)
        .forEach((sentence)=>{
            content.sentences.push({
                text:sentence,
                keyWords:[],
                images:[]
            })
        });
        
        
        
    }
}
module.exports = robot;