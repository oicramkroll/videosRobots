const googelApi = require('googleapis').google;
const download = require('image-downloader');
const customSearch = googelApi.customsearch('v1');
const state = require('./state.js');
const credential = require('../credentials/googleApi.json');
module.exports  = async ()=>{
    const content = state.load();
    //await fetchImagesOfAllScentences(content);
    await downloadImages(content);
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

    async function saveImages(urlImage,indexSentece,indexImage){
        try {
            const { filename, image } = await download.image({
                url: urlImage,
                dest: `./content/${indexSentece}-${indexImage}-original.png`
                });
            console.log(`imagem salva => ${filename}`);
            return `${filename}`;
        } catch (error) {
            throw new Error(`erro ao salvar a imagem => ${error}`);
        }
    }

    async function downloadImages(content){
        content.DownloadedImages=[];
        const imagesForDownload = [];
        for (let indexSentece = 0; indexSentece < content.sentences.length; indexSentece++) {
            const sentence = content.sentences[indexSentece];
            for (let indexImage = 0; indexImage < sentence.images.length; indexImage++) {
                const urlImage = sentence.images[indexImage];
                try {
                    if(imagesForDownload.includes(urlImage)) {
                        throw new Error(`Imagem ja existe`);
                    }
                    const imageDanloaded = await saveImages(urlImage,indexSentece,indexImage);
                    imagesForDownload.push(urlImage);
                    content.DownloadedImages.push(imageDanloaded);
                    break;
                } catch (error) {
                    console.log(`Erro => ${error}`);
                }
            }
        };
    }
    
}