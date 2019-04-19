const robots = {
    userInput: require('./robots/user-input.js'),
    text: require('./robots/text.js')
}


async function start(){
/*
    const content = {
        searchTerm:'',
        prefix:'',
        sourceContentOriginal:'',
        sourceContentSinitized:'',
        sentences:[
            {
                text:'',
                keyWords:[],
                images:[]
            }
        ]
    };
*/
    const content = {};
    robots.userInput(content);
    await robots.text(content);
    
   
    console.log(content);
}
start();