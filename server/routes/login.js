const express = require('express')
const router = express.Router()
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8)
})

//login with existing user

router.post('/', async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body)
        if (error) return res.status(400).send('Wrong body')

        let user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send('Wrong credentials')

        const checkResult = await bcrypt.compare(req.body.password, user.password)
        if (!checkResult) return res.status(400).send('Wrong credentials')

        const token = jwt.sign({ _id: user._id, accType: user.accType }, process.env.JWTKEY)
        res.status(200).send(token)
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = router