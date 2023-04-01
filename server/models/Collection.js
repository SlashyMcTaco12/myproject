const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    cards: {
        type: Array,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
})

const Collection = mongoose.model('collections', collectionSchema)
module.exports = Collection