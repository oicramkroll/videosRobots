function robot(dataContent){
    //console.log(`termo recebido com ${dataContent.searchTerm}`);
    fetchContetFromWikiPedia(content);
    sanitizeContent(content);
    breakContentIntoSenteces(content);
}
module.exports = robot;