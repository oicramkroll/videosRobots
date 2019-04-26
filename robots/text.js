const algorithmia = require('algorithmia');
const credentialAlgorithimia = require('../credentials/algorithmia.json');
const sentenceBoundaryDetection = require('sbd');
const whatsonCredentials = require('../credentials/watson-nlu.json');
const naturalLanguageUnderstandv1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new naturalLanguageUnderstandv1({
    version: '2019-04-25',
    iam_apikey: whatsonCredentials.apikey,
    url: whatsonCredentials.url
});

module.exports = robot;
async function robot(content){
    await fetchContetFromWikiPedia(content);
    await sanitizeContent(content);
    await fetchKeyWordsOfAllSentences(content);

    async function fetchContetFromWikiPedia(content){
        const clientAlgorithmia = algorithmia(credentialAlgorithimia.apikey);
        const result = await clientAlgorithmia
        .algo("web/WikipediaParser/0.1.2?timeout=300")
        .pipe({
            "articleName": content.searchTerm,
            "lang": "en"
        });
        content.sourceContentOriginal = result.get().content;
    }

    async function sanitizeContent(content){
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
        .slice(0,content.maximumSentences)
        .forEach((sentence)=>{
            
            content.sentences.push({
                text:sentence,
                keyWords: [],
                images:[]
            })
        });
    }

    async function fetchKeyWordsOfAllSentences(content){
        for (const sentence of content.sentences) {
            sentence.keyWords = await fetchWatsonAndReturnKeyWords(sentence.text);
            console.log(sentence);
        }
    }
   
    async function fetchWatsonAndReturnKeyWords(sentence){
        return new Promise((resolve,reject)=>{
            nlu.analyze({
                text:sentence,
                features:{
                    keywords:{}
                }
            },(error,response)=>{
                if(error){
                    throw error;
                }
                const keyWords = response.keywords.map((keyword)=>{ return keyword.text });
                resolve(keyWords);
            });
    
        });
    }
}