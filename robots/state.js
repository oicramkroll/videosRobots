const fs = require('fs');
const contentFilePath ='./constent.js';
module.exports = {
    seve : (content)=>{
        const contentString = JSON.stringify(content);
        return fs.writeFileSync(contentFilePath,contentString);
    },
    load : ()=>{
        const fileBuffer = fs.readFileSync(contentFilePath,'utf-8');
        return JSON.parse(fileBuffer);
    }
} ;