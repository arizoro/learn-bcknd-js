const express = require('express');
const app = express();
const morgan = require('morgan');
const EroorHandler = require('./EroorHandler')



app.use(morgan('tiny'))

// app.use((req,res, next) =>{
//     console.log('middleware pertama')
//     next();
// })
// app.use((req,res, next) =>{
//     console.log('middleware kedua')
//     next();
// })

//!mengoverite method
// app.use((req, res, next) => {
//     // req.method = 'PUT'
//     console.log(req.method, req.url)
//     next()
// })

// // memberikan object pada req
// app.use((req, res, next) => {
//     req.dateTime = Date.now();
//     next()
// })

// app.use((req,res,next) => {
//     const {password} = req.query
//     if(password == 'admin'){
//         next();
//     }
//     res.send('masukan password dahulu')
// })

const auth = function(req,res,next) {
    const {password} = req.query
    if(password == 'admin'){
        next();
    }
    // res.send('masukan password dahulu')
    throw new EroorHandler('masukan password dahulu ', 401)

}

app.get('/', (req,res) => {
    res.send('hello world')
})

app.get('/halaman', (req,res) => {
    // console.log(req.dateTime)
    res.send('ini url halaman')
})

app.get('/admin', auth, (req,res) => {
    res.send('ini halaman admin')
})

app.get('/error', (req,res) => {
    bird.fly();
})

app.get('/generateError', (req,res) => {
    throw new EroorHandler();
})

app.use((err,req,res,next) => {
    const { status = 500 , message = 'something is wrong'} = err
    res.status(status).send(message);
})

// app.use((err,req,res,next) => {
//     console.log('********************')
//     console.log('********EROR********')
//     console.log('********************')
//     next(err)
//     })

app.use((req,res) => {
    res.status(404).send('Page Not Found')
})




app.listen(3000, () => {
    console.log('Server is runnig on port 3000')
})