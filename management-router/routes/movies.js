const express = require('express')

const router = express.Router();

router.get('/', (req,res) => {
    const{ user = 'no name' , token = ''} = req.cookies
    console.log(user)
    res.send(`hello ${user} , token kamu ${token}`)
    // res.send('movies index')
})

router.get('/create', (req,res) => {
    res.send('movies create')
})

router.post('/', (req,res) => {
    res.send('movies post')
})

router.get('/:id', (req,res) => {
    res.send('movies show')
})

router.put('/:id', (req,res) => {
    res.send('movies update')
})

router.delete('/delete',(req,res) => {
    res.send('delete')
})

module.exports = router