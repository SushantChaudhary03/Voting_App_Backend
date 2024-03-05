const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const User = require('./../models/user');

// SignUp route
router.post('/signup', async (req, res) => {
    try {
        const data = req.body
        const newUser = new User(data)
        const response = await newUser.save();
        console.log("data saved successfully");

        const payload = {
            id: response.id
        }

        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("token is: ", token)

        res.status(200).json({ response: response, token: token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

// Login route
router.post('/login', async (req, res) => {
    try {
        const { adharCardNumber, password } = req.body;

        // find the user by username
        const user = await User.findOne({ adharCardNumber: adharCardNumber });

        // if user does not exist or password does not match then return error
        if (!user || !(await user.comparePassword(password))) {
            res.status(500).json({ error: "Invalid username or password" });
        }

        const payload = {
            id: user.id
        }
        const token = generateToken(payload);

        res.json({ token });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"})
    }
})

// Profile route
router.post('/profile', jwtAuthMiddleware, async(req, res)=>{
    try{
        const userData = req.body

        const userId = userData.id;
        const user = await User.findById(userId);

        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
})

// password update route
router.put('/profile/password', jwtAuthMiddleware, async(req, res)=>{
    try{
        const userId = req.user.id;
        const {currentPassword, newPassword} = req.body;

        const user = await User.findById(userId);

        if (!(await user.comparePassword(currentPassword))) {
            res.status(500).json({ error: "Invalid username or password" });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        console.log("password updated");
        res.status(200).json({massage: "password updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
})