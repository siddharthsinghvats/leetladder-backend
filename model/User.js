const mongoose = require("mongoose")
mongoose.set('debug', true);

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    starredQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    }], 
    doneQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    }],
    profileImg: {
        type: String,
        default: "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
});
const User = mongoose.model("users", usersSchema);
module.exports = User