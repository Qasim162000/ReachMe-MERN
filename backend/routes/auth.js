const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')

//Router1: Create user using POST:"api/auth/createuser". No,Login required
router.post('/createuser',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            //Check if user exists already
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }

            //Create a new user
            User.create({
                username: req.body.username,
                password: req.body.password,
            }).then(user => res.json(user));
        } catch (error) {
            console.log(error);
            res.json(500).send("Internal Server Error")
        }
    })

    //Router2: Authenticate an existing user using POST:"api/auth/login". No Login required