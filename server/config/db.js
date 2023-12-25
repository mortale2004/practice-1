const mongoose = require("mongoose");


const connectToMongoDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI);
}

mongoose.connection.on("connected", ()=>{
    console.log("Connected Succussfully");
})

mongoose.connection.on("disconnected", ()=>{
    console.log("Disconnected Succussfully");
})

module.exports = connectToMongoDB