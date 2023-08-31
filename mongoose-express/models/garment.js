const mongoose = require('mongoose');
const Product = require('./product')

const garmenSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'nama tidak boleh kosong']
    },

    location : {
        type : String
    },

    contact : {
        type : String,
        required : [true , 'kontak tidak boleh kosong']
    },
    
    products :[
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
        }
    ]
})
//* menggunkan method .post setelah berhasil menjalankan app.delete di index.js
garmenSchema.post('findOneAndDelete', async function (garment) {
    if(garment.products.length){
        const res = await Product.deleteMany({ _id : {$in : garment.products}})
        console.log(res)
    }
})

const Garment = mongoose.model('Garment', garmenSchema);


module.exports = Garment