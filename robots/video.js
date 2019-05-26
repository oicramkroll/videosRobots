const state = require('./state.js');
const gm = require('gm').subClass({imageMagick:true});
module.exports = async function(){
    const content = state.load();
    await convertImages(content);
    

    async function convertImages(content){
        new Promise((resolve, reject)=>{
            for (let index = 0; index < content.DownloadedImages.length; index++) {
                const originalImage = content.DownloadedImages[index];
                const configGM = {
                    originalImage: `${originalImage}[0]`,
                    imageConverted: originalImage.replace('original', 'converted'),
                    width: 1920,
                    height: 1080
                };
                gm(configGM.originalImage)
                .resize(configGM.width,configGM.height)
                /*.out('(')
                .out('-clone')
                .out('0')
                .out('-background', 'white')
                .out('-blur', '0x9')
                .out('-resize', `${configGM.width}x${configGM.height}^`)
                .out(')')
                .out('(')
                .out('-clone')
                .out('0')
                .out('-background', 'white')
                .out('-resize', `${configGM.width}x${configGM.height}`)
                .out(')')
                .out('-delete', '0')
                .out('-gravity', 'center')
                .out('-compose', 'over')
                .out('-composite')
                .out('-extent', `${configGM.width}x${configGM.height}`)*/
                .write(configGM.imageConverted, (error) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log(`> [video-robot] Image converted: ${configGM.imageConverted}`)
                    resolve();
                });
            }
        });
    }
}