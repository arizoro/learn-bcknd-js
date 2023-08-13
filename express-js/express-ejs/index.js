const path = require('path')
const express = require('express');

const app = express();
const tagsData = require('./data.json')

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static( path.join(__dirname,'/public')))


app.get('/', (req,res) => {
    res.render('home');
})

app.get('/random', (req,res) => {
    const numb = Math.floor(Math.random() * 10) + 1;
    res.render('random', {
        random : numb
    });
})

app.get('/t/:tag', (req,res) => {
    const {tag} = req.params;
    const data = tagsData[tag]
    if(data){
        res.render('tag', {data});
    }else{
        res.render('notfound', {tag})
    }
})

app.get('/cats', (req,res)=> {
    const cats = ['embul', 'mino', 'yoyok', 'oren']
    res.render('cats',{cats})
})

app.listen(8080, () => {
    console.log('server is runing in port http://localhost:8080 ')
})