const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 2
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10
    },
    image: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
})

const Card = mongoose.model('cards', cardSchema)
module.exports = Card