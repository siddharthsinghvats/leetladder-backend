const mongoose = require("mongoose")
mongoose.set('debug', true);

const questionSchema= new mongoose.Schema({
    questionName: {
        type: String,
        required: true
    },
    link : {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    }]
});
const Questions = mongoose.model("questions", questionSchema);
module.exports = Questions