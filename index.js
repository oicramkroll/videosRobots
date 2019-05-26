const robots = {
    userInput: require('./robots/user-input.js'),
    text: require('./robots/text.js'),
    state :require('./robots/state.js'),
    searchEngine:require('./robots/googleSearch.js'),
    video:require('./robots/video.js')
}


async function start(){
    
    //robots.userInput();
    //await robots.text();
    //await robots.searchEngine();
    await robots.video();

    
    const content = robots.state.load();
    //sconsole.dir(content,{depth:null});
}
start();