const jokes = require('give-me-a-joke');
const color = require('chalk-rainbow')

jokes.getRandomDadJoke(function(joke){
    console.log(color('jokes bapak bapak : '+joke))
})

// jokes.getCustomJoke(function(joke){
//     console.log(joke)
// })