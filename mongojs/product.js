const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(()=> {
    console.log('Connect to mongoDB');
}).catch((err) => {
    console.log(err)
})

const productShcema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
	price : {
        type : Number,
        required : true,
        min : 0
    },
	color:  {
        type : String,
        required : true
    },
	size :  [{
        type : String,
        required : true
    }],
	description :  {
        type : String,
        required : true,
        maxLength : 250
    },
	condition:  {
        type : String,
        required : true,
        enum : ['baru', 'bekas']
    },
	stock :  {
        type : Number,
        required : true,
        min : [0, 'stock tidak boleh minus']
    },
	availability : {
		online : {
            type : Boolean,
            required : true
        },
		offline : {
            type : Boolean,
            required : true
        } 
	}
})

//!method isntant
productShcema.methods.outStock = function(){
    this.stock = 0;
    this.availability.online = false
    this.availability.offline = false
    return this.save()
}

//!method static
productShcema.statics.closeStore = function() {
    return this.updateMany({}, {
        stock : 0,
        "availability.online" : false, 
        "availability.offline" : false, 
    })
}

const Product = mongoose.model('Product', productShcema)

const changeStock = async (id) => {
    const foundProduct = await Product.findById(id)
    await foundProduct.outStock()
    console.log('data berhasil di ubah')
}

Product.closeStore().then((result) => { console.log(result) })
.catch((err) => { console.log(err) })

// Product.insertMany(
//     [
//         {
//             "name": "Kemeja Flanel",
//             "brand": "Hollister",
//             "price": 750000,
//             "color": "biru muda",
//             "size": ["S", "M", "L"],
//             "description": "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
//             "condition": "baru",
//             "stock": 25,
//             "availability": {
//                 "online": true,
//                 "offline": true
//             }
//         },
//         {
//             "name": "Celana Chino",
//             "brand": "Levi's",
//             "price": 900000,
//             "color": "krem",
//             "size": ["28", "30", "32", "34", "36"],
//             "description": "Celana chino dengan warna yang cerah dan desain yang simpel, terbuat dari bahan katun yang nyaman dipakai.",
//             "condition": "baru",
//             "stock": 15,
//             "availability": {
//                 "online": true,
//                 "offline": false
//             }
//         },
//         {
//             "name": "Sweater",
//             "brand": "Gap",
//             "price": 650000,
//             "color": "merah muda",
//             "size": ["S", "M", "L"],
//             "description": "Sweater berkualitas tinggi dengan warna yang cerah dan desain yang simpel, cocok untuk kegiatan sehari-hari.",
//             "condition": "baru",
//             "stock": 20,
//             "availability": {
//                 "online": true,
//                 "offline": true
//             }
//         },
//         {
//             "name": "Sepatu Sneakers",
//             "brand": "Nike",
//             "price": 1200000,
//             "color": "putih",
//             "size": ["38", "39", "40", "41", "42"],
//             "description": "Sepatu sneakers dengan desain yang sporty dan modern, terbuat dari bahan sintetis yang berkualitas tinggi.",
//             "condition": "baru",
//             "stock": 10,
//             "availability": {
//                 "online": true,
//                 "offline": true
//             }
//         },
//         {
//             "name": "Tas Ransel",
//             "brand": "Herschel",
//             "price": 1500000,
//             "color": "biru",
//             "size": ["one size"],
//             "description": "Tas ransel dengan desain yang stylish dan modern, terbuat dari bahan polyester yang ringan dan tahan lama.",
//             "condition": "baru",
//             "stock": 5,
//             "availability": {
//                 "online": false,
//                 "offline": true
//             }
//         },
//         {
//             "name": "Kacamata Aviator",
//             "brand": "Ray-Ban",
//             "price": 2000000,
//             "color": "emas",
//             "size": ["one size"],
//             "description": "Kacamata aviator dengan desain yang elegan dan klasik, terbuat dari bahan logam berkualitas tinggi.",
//             "condition": "baru",
//             "stock": 8,
//             "availability": {
//                 "online": true,
//                 "offline": false
//             }
//         },
//         {
//             "name": "Baju Renang",
//             "brand": "Speedo",
//             "price": 500000,
//             "color": "biru tua",
//             "size": ["XS", "S", "M", "L", "XL"],
//             "description": "Baju renang dengan desain yang sporty dan ergonomis, terbuat dari bahan spandex yang nyaman dan tahan lama.",
//             "condition": "baru",
//             "stock": 12,
//             "availability": {
//                 "online": true,
//                 "offline": true
//             }
//         },
//         {
//             "name": "Topi Baseball",
//             "brand": "New Era",
//             "price": 350000,
//             "color": "hitam",
//             "size": ["one size"],
//             "description": "Topi baseball dengan desain yang simpel dan elegan, terbuat dari bahan katun berkualitas tinggi.",
//             "condition": "baru",
//             "stock": 18,
//             "availability": {
//                 "online": true,
//                 "offline": true
//             }
//         },
//         {
//             "name": "Rompi",
//             "brand": "Zara",
//             "price": 850000,
//             "color": "abu-abu",
//             "size": ["S", "M", "L"],
//             "description": "Rompi dengan desain yang stylish dan modern, terbuat dari bahan wol yang nyaman dan berkualitas tinggi.",
//             "condition": "baru",
//             "stock": 7,
//             "availability": {
//                 "online": true,
//                 "offline": false
//             }
//         },
//         {
//             "name": "Jas",
//             "brand": "Hugo Boss",
//             "price": 4500000,
//             "color": "hitam",
//             "size": ["40R", "42R", "44R"],
//             "description": "Jas dengan desain yang elegan dan klasik, terbuat dari bahan wol yang nyaman dan berkualitas tinggi.",
//             "condition": "baru",
//             "stock": 3,
//             "availability": {
//                 "online": false,
//                 "offline": true
//             }
//         },
//         {
//             "name": "Sepatu Loafers",
//             "brand": "Gucci",
//             "price": 8000000,
//             "color": "coklat",
//             "size": ["40", "41", "42", "43", "44"],
//             "description": "Sepatu loafers dengan desain yang mewah dan elegan, terbuat dari bahan kulit yang berkualitas tinggi.",
//             "condition": "baru",
//             "stock": 6,
//             "availability": {
//                 "online": true,
//                 "offline": false
//             }
//         }
//     ]
// )
// .then((result) => { console.log(result) })
// .catch((err) => { console.log(err) })



// changeStock('64e311d38292954e0448b24a')

// const tshirt = new Product({name : 'Tshirt Polo Xl' , price: 120000 });

// tshirt.save().then((result) => { console.log(result) }).catch((err) => { console.log(err) })

// const product = new Product({
//     "name": "Kemeja Flanel",
//     "brand": "Hollister",
//     "price": 750000,
//     "color": "biru muda",
//     "size": ["S", "M", "L"],
//     "description": "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
//     "condition": "baru",
//     "stock": 25,
//     "availability": {
//         "online": true,
//         "offline": true
//     }
// })


// product.save().then((result) => { console.log(result) }).catch((err) => { console.log(err) })

// Product.findOneAndUpdate({name : 'Kemeja Flanel'},{
//     "name": "Kemeja Flanel",
//     "brand": "Hollister",
//     "price": 150000,
//     "color": "biru muda",
//     "size": ["S", "M", "L"],
//     "description": "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
//     "condition": "baru",
//     "stock": 25,
//     "availability": {
//         "online": true,
//         "offline": true
//     }       
// },
// {new : true , runValidators : true})
// .then((result) => { console.log(result) })
// .catch((err) => { console.log(err) })