const express = require('express')
const router = express.Router()
const joi = require('joi')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Collection = require('../models/Collection')
const jwt = require('jsonwebtoken')

const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
    accType: joi.string().required()
})

//create new user

router.post('/', async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body)
        if (error) return res.status(400).send('Wrong body')

        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send('Email already taken')

        user = new User(req.body)
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(req.body.password, salt)
        await user.save()
        
        let collection = new Collection({ userID: user._id, cards: [], isActive: true })
        await collection.save()

        res.status(201).send('Successfully registered')
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = router