const express = require('express');

const app = express();

// app.use( (req ,res) => {
//     console.log('we got request .!')
//     // res.send('<h1>Hello world</h1>')
//     res.send({
//         send: 'hello world'
//     })
//     // console.dir(res)
// })

app.get('/', (req,res) => {
    res.send('ini halaman home')
})

app.get('/blog/:judul', (req,res) => {
    const {judul} = req.params
    res.send(`Halaman blog dgn judul : ${judul}`);
    console.log(req.params)
})

app.get('/blog/:author/:category/:judul' ,(req,res) => {
    const {author, category , judul} = req.params
    res.send(`Halaman blog Author: ${author} | Category: ${category} dan Judul : ${judul}`)
})

app.get('/search', (req,res) => {
    const { q } = req.query
    if(!q){
        res.send('halaman tidak ditemukan')
    }
    res.send(`<h1>hasil pencarian : ${q} </h1>`)
    console.log(req.query)
})

app.get('/cats' , (req,res) => {
    res.send('ini halaman cats')
});

app.post('/cats', (req,res) => {
    res.send('ini halaman post milik cats')
})

app.get('/about', (req,res) => {
    res.send('ini halaman about')
})



app.get('*', (req, res) => {
    res.send('halaman tidak ditemukan')
})


app.listen(8080, () => {
    console.log('server running in port http://localhost:8080')
})