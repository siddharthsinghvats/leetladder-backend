const mongoose = require('mongoose');
const express = require('express');

var dbConnect = async () => {
    await mongoose.connect("mongodb+srv://siddharth1singh1:"+process.env.PASSWORD+"@cluster0.c6u2ihn.mongodb.net/")
    .then(() => console.log('DB Connected!'));
}
 
module.exports = dbConnect;