const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    options:{
        type: Array,
        required: true
    },
    solution:{
        type: Number,
        required: true
    },
    queTypeId:{
        type: mongoose.Types.ObjectId,
        ref: "questiontype",
        required: true
    },
    classId: {
        type: mongoose.Types.ObjectId,
        ref: "class"
    },
    subjectId: {
        type: mongoose.Types.ObjectId,
        ref: "subject",
    },
});

module.exports = mongoose.model("question", QuestionSchema);