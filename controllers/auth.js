const express = require('express');
const User = require("../model/User")
const bcrypt = require('bcryptjs')
const path = require('path');


const authRouter = express.Router()

authRouter.post('/signup',async (req, res) => {
        const user = req.body;
        const already_exists = await User.findOne({ username: user?.username });
        if (already_exists) {
            return res.status(409).json({ error: "username already exists" })
        }
        try {
            
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            const save_user = await User.create(user);
            delete  save_user.password;
            res
                .status(201)
                .json({ message: "User signed in successfully", success: true, user:save_user });

        }
        catch (err) {
            return res.status(500).json({ error: "failed to sign-up" ,error:err});
        }

    })


    authRouter.get('/:username',async (req, res) => {
        const user = req.params.username;
        const userData = await User.findOne({ username:user });
        try {
            res
                .status(201)
                .json({ message: "User fetched successfully", success: true, user:userData});

        }
        catch (err) {
            return res.status(500).json({ error: "failed to fetch user" ,error:err});
        }

    })

    authRouter.put('/',async (req, res) => {
        console.log("here")
        const user = req.body.username;
        const userData = await User.findOne({ username:user });
        try {
            const question = req.body.id 
            userData.doneQuestions.push(question)
            await userData.save();
            res
                .status(201)
                .json({ message: "User updated successfully", success: true, user:userData});

        }
        catch (err) {
            return res.status(500).json({ error: "failed to fetch user" ,error:err});
        }

    })
    authRouter.delete('/',async (req, res) => {
        console.log("delete")
        const user = req.body.username;
        const userData = await User.findOne({ username:user });
        try {
            const question = req.body.id 
            // console.log(question);
            // console.log(question==userData.doneQuestions[1])
            userData.doneQuestions=userData.doneQuestions.filter(item=>item!=question)
            // console.log(userData.doneQuestions)
            await userData.save();
            res
                .status(201)
                .json({ message: "User updated successfully", success: true, user:userData});

        }
        catch (err) {
            return res.status(500).json({ error: "failed to fetch user" ,error:err});
        }

    })

authRouter.post('/login' ,async (req, res) => {
    const user = req.body;
    try {
        const user_exists = await User.findOne({ username: user.username });
        if (user_exists) {
            const passwordOk = await bcrypt.compare(user.password, user_exists.password);
            if (passwordOk) {
                
                delete user_exists._doc.password;
                res
                .status(201)
                .json({ message: "User logged in successfully", success: true, user:user_exists._doc });
            } else {
                return res.status(401).json({ "error": "wrong username or password" })
            }
        } else {
            return res.status(404).json({ "error": "user does not exist" });
        }
    }
    catch (err) {
        return res.status(500).json({ "error": "internal server error" });
    }
})

module.exports = { authRouter };