const express = require('express')

const router = express.Router();

router.get('/', (req,res) => {
    res.send('teater index')
})

router.get('/create', (req,res) => {
    res.send('teater create')
})

router.post('/', (req,res) => {
    res.send('teater post')
})

router.get('/:id', (req,res) => {
    res.send('teater show')
})

router.put('/:id', (req,res) => {
    res.send('teater update')
})

router.delete('/delete',(req,res) => {
    res.send('delete')
})

module.exports = router