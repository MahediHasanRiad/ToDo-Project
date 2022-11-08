// basic
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// security
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const xssClean = require('xss-clean')
const routers = require('./src/routers/apiRouters')


// rate limit 
const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 100})

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())
app.use(hpp())
app.use(xssClean())
app.use(limiter)

// Routers
app.use('/todo', routers)

// mongoose connection 
const url = 'mongodb://127.0.0.1:27017/ToDo'
const userPass = {user: '', pass: ''}

mongoose.connect(url, userPass, (err)=> {
    console.log(err)
    console.log('connection success')
})


module.exports = app

