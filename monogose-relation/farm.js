const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/relation_db')
.then((result) => { console.log('connect to mongodb ') })
.catch((err) => { console.log(err) })

// * membuat relation one to many dgn mongose

const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
    seasons : {
        type : String,
        enum : ['summer', 'winter', 'fall', 'spring']
    }
})

const farmSchema = new mongoose.Schema({
    name : String,
    city : String,
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'

    }]
})

const Product = mongoose.model('Product', productSchema)
const Farm = mongoose.model('Farm', farmSchema)

// Product.insertMany([
//     {
//         name : 'jack fruits',
//         price : 10,
//         seasons : 'summer'
//     },
//     {
//         name : 'melon',
//         price : 8 ,
//         seasons : 'fall'
//     },
//     {
//         name : 'garfe',
//         price : 4 ,
//         seasons : 'spring'
//     }
// ])

// const makeFarm = async () => {
//     const farm = new Farm ({
//         name : 'Farm Family',
//         city : 'Jakarata'
//     })

//     const melon = await Product.findOne({name : 'melon'})
//     farm.products.push(melon)
//     await farm.save()

//     console.log(farm)
// }

// makeFarm();

const addProduct = async (id) => {
    const farm = await Farm.findById(id)
    const jackFruit = await Product.findOne({name : 'jack fruits'})
    farm.products.push(jackFruit)
    await farm.save()

    console.log(farm)
}

addProduct("64ecbcb35e7e6cd64463781d");