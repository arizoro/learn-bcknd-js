const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movie_db')
.then(()=> {
    console.log('Connect to mongoDB');
}).catch((err) => {
    console.log(err)
})

const movieScema = mongoose.Schema({
    title : String,
    year : Number,
    rating : Number,
    author : String,
    genre: String,
    director: String
})

const Movie = mongoose.model('Movie', movieScema);

// const movie = new Movie({
//     title : 'Black Phanter',
//     year : 2018,
//     rating : 7.8,
//     author : 'Ryan Cugglar'
// })

// movie.save();

// console.log(movie);

// Movie.insertMany([
// {
//     "title": "Avengers: Infinity War",
//     "genre": "Action",
//     "director": "Anthony Russo, Joe Russo",
//     "year": 2018,
//     "cast": ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
//     "description": "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
//     "rating": 8.4,
//     "image": "https://www.example.com/avengers_infinity_war.jpg"
// },
// {
//     "title": "Joker",
//     "genre": "Crime",
//     "director": "Todd Phillips",
//     "year": 2019,
//     "cast": ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
//     "description": "In Gotham City, mentally-troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: 'The Joker'.",
//     "rating": 8.4,
//     "image": "https://www.example.com/joker.jpg"
// },
// {
//     "title": "Parasite",
//     "genre": "Drama",
//     "director": "Bong Joon Ho",
//     "year": 2019,
//     "cast": ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
//     "description": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
//     "rating": 8.6,
//     "image": "https://www.example.com/parasite.jpg"
// },
// {
//     "title": "Spider-Man: Into the Spider-Verse",
//     "genre": "Animation",
//     "director": "Bob Persichetti, Peter Ramsey, Rodney Rothman",
//     "year": 2018,
//     "cast": ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
//     "description": "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
//     "rating": 8.4,
//     "image": "https://www.example.com/spider_man_into_the_spider_verse.jpg"
// }
// ]).then((result) => {
//     console.log('its work')
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })


//mencari data

// const getMovie = Movie.findOne({year : {$gte : 2018}, genre : 'Drama' })
// .then((result) => {
// console.log(result) 
// }).catch((err) => { 
//     console.log(err) 
// })


//mencari data by id

// Movie.findById('64e24050b3569a13a43f687e').then((result) => { console.log(result) }).catch((err) => { console.log(err) })

// Movie.updateOne({title : 'Parasite'}, {rating : 7.0 }).then((result) => { console.log(result) }).catch((err) => { console.log(err) })

// Movie.updateMany({year : {$lte : 2018} }, {rating: 8 }).then((result) => { console.log(result) }).catch((err) => { console.log(err) })

// Movie.findByIdAndUpdate('64e1cfc959b998cac5e7aeb5',{rating : 10 },{new : true}).then((result) => { console.log(result) }).catch((err) => { console.log(err) })

// Movie.deleteOne({_id : '64e24050b3569a13a43f687e'}).then((result) => { console.log(result) }).catch((err) => { console.log(err) })

Movie.findByIdAndDelete({_id : '64e2405369feaeaba9de7ca0'}).then((result) => { console.log(result) }).catch((err) => { console.log(err) })