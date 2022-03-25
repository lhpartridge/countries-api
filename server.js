//Build mini server
const express = require('express')
const server = express()
const router = require('./routes/router')
const PORT = process.env.PORT || 3000

server.set('view engine', 'ejs')

//http://localhost:3000
server.use('/', router)

server.listen(PORT, ()=> {
    console.log(`Passport stamped ${PORT}`)
})