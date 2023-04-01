const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const joi = require('joi')
const Card = require('../models/Card')
const Collection = require('../models/Collection')

const cardSchema = joi.object({
    name: joi.string().required().min(2),
    description: joi.string().required().min(2),
    address: joi.string().required().min(2),
    phone: joi.string().required().min(10).max(10),
    image: joi.string().required(),
    userID: joi.string().required()
})

//get all cards

router.get('/', auth, async (req, res) => {
    try {
        let cards = await Card.find({}, { __v: 0 })

        return res.status(200).send(cards)
    } catch (error) {
        return res.status(400).send(error)
    }
})

//add new card

router.post('/', auth, async (req, res) => {
    try {
        const { error } = cardSchema.validate(req.body)
        if (error) return res.status(400).send('Wrong body')

        let collection = await Collection.findOne({ userID: req.payload._id })

        let card = await Card.findOne({ name: req.body.name })
        if (card) return res.status(400).send('Card name already taken')

        card = new Card(req.body)
        await card.save()

        collection.cards.push(card)
        await collection.save()

        return res.status(201).send('Card created successfully')
    } catch (error) {
        return res.status(400).send(error)
    }
})

//update existing card

router.put('/:_id', auth, async (req, res) => {
    try {
        const { error } = cardSchema.validate(req.body)
        if (error) return res.status(400).send('Wrong body')

        let card = await Card.findByIdAndUpdate(req.params._id, req.body, {new: true})
        if (!card) return res.status(404).send('Card not found')

        let collection = await Collection.findOne({ userID: req.payload._id })
        collection.cards[collection.cards.findIndex((card) => card._id == req.params._id)] = card
        collection.save()

        return res.status(200).send('Card updated successfully')
    } catch (error) {
        return res.status(400).send(error)
    }
})

//delete existing card

router.delete('/:_id', auth, async (req, res) => {
    try {
        let card = await Card.findByIdAndRemove(req.params._id)
        if (!card) return res.status(404).send('Card not found')

        let collection = await Collection.findOne({ userID: req.payload._id })
        collection.cards.splice(collection.cards.findIndex((card) => card._id == req.params._id), 1)
        collection.save()

        return res.status(200).send('Card removed successfully')
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = router