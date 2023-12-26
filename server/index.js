require("dotenv").config();
const express = require("express");
const app = express();
const connectToMongoDB = require("./config/db");
const cors = require("cors");


connectToMongoDB();

app.use(express.json());
app.use(cors());
app.use("/api/classes", require("./routes/Class"));
app.use("/api/subjects", require("./routes/Subject"));
app.use("/api/questions", require("./routes/Question"));
app.use("/api/questiontypes", require("./routes/QuestionType"));
app.use("/api/sourcetags", require("./routes/SourceTag"));







app.listen(process.env.PORT, (req,res)=>{
    console.log("Server started");
});

