const express = require('express')

const router = express.Router();

router.use('/', (req,res,next) => {
    if(req.query.isAdmin){
        next()
    }
    res.send('your is not admin')
})

router.get('/', (req,res) => {
    res.cookie('user' , 'admin')
    res.cookie('token' , '132335fdksfkslk')
    res.send('Administrator')
})


module.exports = router