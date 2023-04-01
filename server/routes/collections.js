const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const Collection = require('../models/Collection')

//get collections

router.get('/', auth, async (req, res) => {
    try {
        let collections = await Collection.find({}, {__v: 0})

        return res.status(200).send(collections)
    } catch (error) {
        return res.status(400).send(error)
    }
})

//get collection by id

router.get('/:_id', auth, async (req, res) => {
    try {
        let collection = await Collection.findOne({ userID: req.params._id })
        if (!collection) return res.status(404).send('No collection found')

        return res.status(200).send(collection)
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = router