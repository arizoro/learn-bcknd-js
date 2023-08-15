const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const app = express();


app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.set('views' , path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.get('/order', (req,res) => {
    res.send('Get order')
})



app.post('/order', (req,res) => {
    const {item , qty} = req.body
    res.send('Order item : '+ item + ' Quantity : ' + qty)
})


let comments = [
    {
    id : uuidv4() ,
    username : 'aripunama',
    text : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, in.'
    },
    {
    id : uuidv4(),
    username : 'jajang ',
    text : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, in.ipsum dolor sit ame'
    },
    {
    id :uuidv4(),
    username : 'susi ',
    text : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, in.'
    },
    {
    id : uuidv4(),
    username : 'dimas',
    text : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, in.'
    },
    {
    id : uuidv4(),
    username : 'yanto',
    text : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, in.'
    },
    {
    id : uuidv4(),
    username : 'jojon',
    text : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, in.'
    },
    
]


app.get('/comments', (req,res) => {
    res.render('index',{comments})
})

app.get('/comments/create', (req,res) => {
    res.render('create')
})

app.get('/comments/:id', (req,res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('show',{comment})
})

app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('edit',{comment})
})


app.post('/comments', (req,res) => {
    const {username, text} = req.body
    comments.push({username,text, id : uuidv4()})
    res.redirect('/comments')
})

app.patch('/comments/:id', (req,res) => {
    const {id} =  req.params
    const newComment = req.body.text
    const foundComment = comments.find(c => c.id === id)
    foundComment.text = newComment
    res.redirect('/comments')
})

app.delete('/comments/:id', (req,res)=> {
    const {id} = req.params
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')

})



app.listen(8080, () => {
    console.log('app listen in port http://localhost:8080 ')
})