const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=> {
    console.log('Connect to mongoDB');
}).catch((err) => {
    console.log(err)
})

const personSchema = mongoose.Schema({
    firstName : String,
    lastName : String
})

//! properti model virtual
personSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

//! middle ware
personSchema.pre('save', async function(){
    console.log('persiapan menyimpan data')
})

personSchema.post('save', async function() {
    console.log('data berhasil di simpan')
})

const Person = mongoose.model('Person', personSchema);


const person = new Person({
    firstName : 'Ari',
    lastName : 'purnama' 
})

person.save();
// console.log(person.fullName);