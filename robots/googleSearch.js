const googelApi = require('googleapis').google;
const download = require('image-downloader');
const customSearch = googelApi.customsearch('v1');
const state = require('./state.js');
const credential = require('../credentials/googleApi.json');
module.exports  = async ()=>{
    const content = state.load();
    //await fetchImagesOfAllScentences(content);
    await downloadImages(content);
    //state.seve(content);
    
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

    async function saveImages(imagesArray){
        try {
            for (let index = 0; index < imagesArray.length; index++) {
                const urlImage = imagesArray[index];
                const { filename, image } = await download.image({
                    url: urlImage,
                    dest: `./content/${index}--original.png`
                  });
                console.log(`imagem salva => ${filename}`);
            }
        } catch (error) {
            console.log(`erro ao salvar a imagem => ${error}`);
        }
    }

    async function downloadImages(content){
        content.imagesForDownload=[];
        content.sentences.forEach(sentence => {
            for (const image of sentence.images) {
                try {
                    if(content.imagesForDownload.includes(image)) 
                        throw new Error(`Imagem ja existe`);
                    content.imagesForDownload.push(image);
                    break;
                } catch (error) {
                    console.log(`Erro => ${error}`);
                }
            }
        });
        await saveImages(content.imagesForDownload);
    }
    
   


}