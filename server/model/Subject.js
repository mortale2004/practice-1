const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    classId: {
        type: mongoose.Types.ObjectId,
        ref: "class"
    }
});

module.exports = mongoose.model("subject", SubjectSchema);