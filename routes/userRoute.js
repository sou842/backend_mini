const express = require('express');
const { userModel } = require('../model/userModel');
const bcrypt = require('bcrypt');
const userRoute = express.Router();
var jwt = require('jsonwebtoken');

userRoute.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const already = await userModel.findOne({ email })
        if (already) {
            res.status(200).json({ msg: 'User already exist, please login' })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json({ error: err.massage })
                } else {
                    const user = new userModel({  email, password: hash });
                    await user.save()
                    res.status(200).json({ msg: 'User is register', details: req.body })
                }
            })
        }

    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        console.log(email,user)
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    let token = jwt.sign({ userId: user._id, user: user.name }, 'masai')
                    res.status(200).json({ msg: 'user logged in..', token: token })
                } else {
                    res.status(400).json({ error: err.massage })
                }
            })
        } else {
            res.status(200).json({ msg: 'no user found, please register!!!' })
        }
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

module.exports = { userRoute }
