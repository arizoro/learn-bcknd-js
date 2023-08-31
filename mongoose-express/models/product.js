const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/shop_db')
.then((result) => { console.log('terhubung dengan MongoDb') })
.catch((err) => { console.log(err) })

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'nama tidak boleh kosong']
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Baju', 'Celana', 'Aksesoris', 'Jaket']
    },
    garment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Garment'
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product