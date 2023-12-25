const mongoose = require("mongoose");
const {validationResult} = require("express-validator");
const Question = require("../model/Question");

const createQuestion = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }

    try {
        let question = await Question.findOne({question: req.body.question});

        if (question)
        {
            return res.status(400).json({status: "error", result: ["This Question Already Exist!"]});
        }
        
        question = await Question.create(req.body);
        return res.status(201).json({status: "success", result: [question]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// update
const updateQuestion = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }
    
    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        let question = await Question.findById(req.params.id);

        if (!question)
        {
            return res.status(404).json({status: "error", result: ["Question  Not Found!"]})
        }

        question = await Question.findOne({question: req.body.question});

        if (question && question.question!==req.body.question)
        {
            return res.status(400).json({status: "error", result: ["This Question Already Exist!"]});
        }
        
        question = await Question.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(201).json({status: "success", result: [question]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



// read one
const getOneQuestion = async (req, res)=>{
    

    
    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }
    
    try {
        let question = await Question.findById(req.params.id);

        if (!question)
        {
            return res.status(404).json({status: "error", result: ["Question Not Found!"]})
        }

        return res.status(201).json({status: "success", result: [question]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// read all
const getAllQuestions = async (req, res)=>{

    const queTypeId = req.query?.type;
    const pageNo = Number(req.query?.pageNo) || 1;
    const limit = Number(req.query?.limit) || 3;
    const skip = (pageNo - 1) * limit;

    try {


        let allQuestions;
        if (queTypeId)
        {
            allQuestions = await Question.find({queTypeId: queTypeId}); // fetches all questions with given questions type id
        }
        else
        {
            allQuestions = await Question.find(); // fetches all questions 
        }
        const totalQuestions = allQuestions.length;
        const questions = allQuestions.splice(skip, limit);

        return res.status(201).json({status: "success", result: {questions:questions, total: totalQuestions}});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}


// delete
const deleteQuestion = async (req, res)=>{

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        let question = await Question.findById(req.params.id);

        if (!question)
        {
            return res.status(404).json({status: "error", result: ["Question  Not Found!"]})
        }

        await Question.findByIdAndDelete(req.params.id);
        return res.status(201).json({status: "success", result: ["Deleted Succuessfully..."]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



module.exports=  {createQuestion, updateQuestion,  getOneQuestion, getAllQuestions, deleteQuestion};