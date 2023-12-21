const express = require('express');
const {authRouter} = require('./controllers/auth');
const {questionRouter} = require('./controllers/question');
require('dotenv').config();


const cors = require('cors');
const db = require('./db');

// create a new server
const app = express();
app.use(express.json());
app.use(cors());




app.use("/auth",authRouter);
app.use('/questions',questionRouter);


db();

app.listen(5000,()=>{
    console.log("Server Running");
})