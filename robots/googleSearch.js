const googelApi = require('googleapis').google;
const customSearch = googelApi.customsearch('v1');
const state = require('./state.js');
const credential = require('../credentials/googleApi.json');
module.exports  = async ()=>{
    const content = state.load();
    
    await fetchImagesOfAllScentences(content);
    state.seve(content);


    async function fetchImagesOfAllScentences(content){
        for (const sentence of content.sentences) {
            const query = `${content.searchTerm} ${sentence.keyWords[0]}`;
            sentence.images = await fetchGoogleImagens(query);
            sentence.googleSearchQuery = query;
        }

    }
    async function fetchGoogleImagens(query){
        const response = await customSearch.cse.list({
            auth:credential.googleApiKey,
            cx:credential.searchEngine,
            q:query,
            num:2,
            searchType:'image'
        });
        const images = response.data.items.map((items)=>{ return items.link; });
        return images;
    }
    
   


}