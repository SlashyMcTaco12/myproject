const express = require('express')
const User = require('../models/User')
const router = express.Router()
const _ = require('lodash')
const auth = require('../middlewares/auth')

//receive login details

router.get('/', auth, async (req, res) => {
    try {
        let user = await User.findById(req.payload._id)
        if (!user) return res.status(404).send('User not found')
        res.status(200).send(_.pick(user, ["_id", "name", "email", "isAdmin"]))
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router