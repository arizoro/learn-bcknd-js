const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ErrorHandler = require('./EroorHandler')

const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//! untuk mengambil request dari body
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))

const { error } = require('console')

// *models
const Product = require('./models/product')
const Garment = require('./models/garment')

// ! function wrapAsynck untuk ke mongose
function wrapAsync(fn){
    return function (req,res,next){
        fn(req,res,next).catch(err => next(err))
    }
}


mongoose.connect('mongodb://127.0.0.1/shop_db')
.then((result) => { console.log('terhubung dengan MongoDb') })
.catch((err) => { console.log(err) })


app.get('/', (req,res) => {
    res.send('hello world')
} )


app.get('/products', async(req,res) => {
    const {category} = req.query
    if(category){
        const products = await Product.find({category})
        res.render('products/index', {products, category})
    }else{
        const products = await Product.find({})
        res.render('products/index', {products, category : 'All'})
    }
})

app.post('/products', wrapAsync(async(req,res) => {
    const product = new Product(req.body)
    await product.save()
    res.redirect(`/products/${product._id}`)
}
))

app.get('/products/create', (req,res) => {
    res.render('products/create')
})

app.get('/products/:id', wrapAsync(async(req,res) => {
        const {id} = req.params
        const product = await Product.findById(id).populate('garment')
        res.render('products/detail', {product})
        // res.send(product)
    }
))

app.get('/products/:id/edit', async(req,res,next) => {
    try {
        const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit',{product})
    } catch (error) {
        next( new ErrorHandler('Product Not Found' , 404))
    }
    
})

app.put('/products/:id', async(req,res, next) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        res.redirect(`/products/${product._id}`)
    } catch (error) {
        next( new ErrorHandler('Product Not Found' , 404))        
    }
})


app.delete('/products/:id', wrapAsync(async(req,res) => {
    try {
        const {id} = req.params
        await Product.findByIdAndDelete(id)
        res.redirect('/products')
    } catch (error) {
        next( new ErrorHandler('Product Not Found' , 404))
    }
}))

app.get('/garments', wrapAsync(async(req,res) => {
    const garments = await Garment.find({})
    res.render('garments/index', {garments})
}))

app.get('/garments/create', (req,res) => {
    res.render('garments/create')
})

app.post('/garments', wrapAsync(async(req,res) => {
    const garment = new Garment(req.body)
    await garment.save()
    res.redirect(`/garments`)
}))

app.get('/garments/:id', wrapAsync(async (req,res) => {
    const {id} = req.params
    const garment = await Garment.findById(id).populate('products')
    res.render(`garments/detail`, {garment})
    // res.send(garment)
}))

app.get('/garments/:garment_id/products/create',(req, res) => {
    
    const {garment_id} = req.params
    res.render('products/create', {garment_id})
})

app.post('/garments/:garment_id/products', wrapAsync( async(req, res) => {
    const {garment_id} = req.params
    const garment = await Garment.findById(garment_id)
    const product = new Product(req.body)
    console.log(product)
    product.garment = garment
    garment.products.push(product)
    await garment.save()
    await product.save()
    console.log(garment)

    res.redirect(`/garments/${garment_id}`)
}))

app.delete('/garments/:garment_id', wrapAsync( async(req, res) => {
    const {garment_id} = req.params
    await Garment.findOneAndDelete({_id : garment_id})
    res.redirect('/garments')
}))

const validatorHendler = err => {
    err.status = 400
    err.message = object.value(err.errors).map(item.item.message)
    return new ErrorHandler(err.message,err.status)
}

app.use((err,req,res,next) => {
    console.dir(err)
    if(err.name == 'ValidationError') err => validatorHendler()
    if(err.name == 'CastError'){
        err.status = 404
        err.message = 'Product Not Found'
    }
    next(err)
})

app.use((err,req,res,next) => {
    const {status = 500 , message = 'somthing went wrong'} = err
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('shop app listening on port http://127.0.0.1:3000')
})