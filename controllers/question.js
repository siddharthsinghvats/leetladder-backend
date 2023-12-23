const express = require('express');
const questionRouter = express.Router()
const Questions = require('../model/Questions')
const User = require('../model/User')
const path = require('path');




questionRouter.get('/', async (req, res) => {
    try {
        const questions = await Questions.find();
        if (questions) {
            res.status(200).json(questions);
        } else {
            res.status(400).json({ error: "could not load items" })
        }
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" })
    }

})

questionRouter.get('/all_question_count', async (req, res) => {
    try {
        const questions = await Questions.find();
        if (questions) {
            res.status(200).json({count:questions.length});
        } else {
            res.status(400).json({ error: "could not load items" })
        }
    }
    catch (err) {
        res.status(500).json({ error: "internal server error" })
    }

})



module.exports = { questionRouter};