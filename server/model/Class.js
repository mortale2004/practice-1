const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("class", ClassSchema);