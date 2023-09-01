const express = require('express')
const app = express()
//mengambil data cokie
const cookie = require('cookie-signature')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser('secret-key'))

app.get('/cookieSignature' , (req,res) => {
    const val = cookie.sign('surat','secret')
    const hasil = cookie.unsign(val,'secret')
    res.cookie('paket', val)
    console.log(hasil)
    res.send(val)
})

app.get('/signedCookie', (req,res) => {
    res.cookie('paket' , 'ransel' ,{signed : true})
    res.send('signedCookie')
})

app.get('/verifyCookie', (req ,res) => {
    const cookie = req.signedCookies
    res.send(cookie)
})

//*route teater.js
app.use('/teater', require('./routes/teater'))
app.use('/movies', require('./routes/movies'))
app.use('/admin', require('./routes/admin'))




app.listen(3000, () => {
    console.log('server on port 3000')
})