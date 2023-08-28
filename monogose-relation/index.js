const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/relation_db')
.then((result) => { console.log('connect to mongodb ') })
.catch((err) => { console.log(err) })

const userSchema = new mongoose.Schema({
    name : String,
    addresses : [{
        _id : false,
        street : String,
        city : String,
        country : String
    }]
})

const User = mongoose.model('User', userSchema)
//* contoh relasi one to few (1 user memiliki banyak alamat)
// const makeUser = async() => {
//     const user = new User({
//         name : 'Ari Purnama'
//     })
//     user.addresses.push({
//         street : 'jl. melati',
//         city : 'medan',
//         country : 'IDN'
//     })
//     await user.save()
//     console.log(user)
// }

// makeUser();

const addAddres = async(id) => {
    const user = await User.findById(id)
    user.addresses.push({
        street : 'jl.mawar',
        city : 'Jakarta',
        country : 'USA'
    })

    const res = await user.save()
    console.log(res)
}

addAddres("64ecb2b0bcfcb4e4edf456bd")