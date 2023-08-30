const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/relation_db')
.then((result) => { console.log('connect to mongodb ') })
.catch((err) => { console.log(err) })


const userSchema = new mongoose.Schema({
    username : String,
    age : Number
})

const tweetSchema = new mongoose.Schema({
    text : String,
    like : Number,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)

// * relasi one two scelion 
const makeTweet = async () => {
    const user = await User.findOne({username : 'Ari Purnama',})

    const tweet = new Tweet({
        text : 'hello semua gimana kabar nya?',
        like : 0,
    })

    tweet.user = user
    tweet.save()
}

// makeTweet();

const findTweet = async (id) => {
    const tweet = await Tweet.findById(id).populate('user')
    console.log(tweet)
}

findTweet("64edaab6a0deffbe4915c0af");

