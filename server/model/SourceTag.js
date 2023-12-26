const mongoose = require("mongoose");

const SourceTagSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        enum: ["Unknown", "PYQ", "Navneet", "NCERT"],
        default: "Unknown"
    }
});

module.exports = mongoose.model("sourcetag", SourceTagSchema);