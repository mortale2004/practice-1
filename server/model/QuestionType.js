const mongoose = require("mongoose");

const QuestionTypeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("questiontype", QuestionTypeSchema);