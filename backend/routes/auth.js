const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')

//Route 1: Create user using POST:"api/auth/createuser". No Login required
router.post('/createuser',
    body('email', 'Enter a valid Email').isEmail(),
    body('password', "The password should be atleast 5 characters").isLength({ min: 5 }), async (req, res) => {
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
            user = await User.create({
                email: req.body.email,
                password: req.body.password,
            }).then(user => res.json(user));
        } catch (error) {
            console.log(error.message);
            res.json(500).send("Internal Server Error")
        }
    })


//Route 2: User Login using POST:"api/auth/login". No Login required
router.post('/login', body('email', 'Enter a valid Email').isEmail(),
    body('password', "The password cannot be empty").exists(), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ error: "Enter Valid Credentials" })
            }

        } catch (error) {
            console.log(error.message);
            res.json(500).send("Internal Server Error")
        }
    })
module.exports = router;