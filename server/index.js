const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const register = require('./routes/register')
const login = require('./routes/login')
const cards = require('./routes/cards')
const collections = require('./routes/collections')
const loggedIn = require('./routes/loggedIn')

const port = process.env.PORT || 3001

const logger = (req, res, next) => {
    console.log(`${req.method}, ${req.url}`)
    next()
}

app.use(express.json())
app.use(cors())
app.use(logger)

mongoose.connect(process.env.DB, {useNewUrlParser: true})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err))

app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/cards', cards)
app.use('/api/collections', collections)
app.use('/api/loggedIn', loggedIn)

app.listen(port, () => console.log(`Server started on port ${port}`))