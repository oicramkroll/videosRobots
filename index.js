const robots = {
    userInput: require('./robots/user-input.js'),
    text: require('./robots/text.js'),
    state :require('./robots/state.js')
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
    
    robots.userInput();
    await robots.text();
    
    const content = robots.state.load();
    console.dir(content,{depth:null});
}
start();