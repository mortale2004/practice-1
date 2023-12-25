const mongoose = require("mongoose");
const {validationResult} = require("express-validator");
const QuestionType = require("../model/QuestionType"); 

// create
const createQuestionType = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }

    try {
        let questionType = await QuestionType.findOne({name: req.body.name});

        if (questionType)
        {
            return res.status(400).json({status: "error", result: ["This Question Type Already Exist!"]});
        }

        questionType = await QuestionType.create(req.body);

        return res.status(201).json({status: "success", result: [questionType]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// update
const updateQuestionType = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {

        let questionType = await QuestionType.findById(req.params.id);

        if (!questionType)
        {
            return res.status(404).json({status: "error", result: ["Question Type Not Found!"]})
        }


        questionType = await QuestionType.findOne({name: req.body.name});

        if (questionType && questionType.name!==req.body.name)
        {
            return res.status(400).json({status: "error", result: ["This Question Type Already Exist!"]});
        }

        questionType = await QuestionType.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(201).json({status: "success", result: [questionType]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



// read one
const getOneQuestionType = async (req, res)=>{

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        let questionType = await QuestionType.findById(req.params.id);

        if (!questionType)
        {
            return res.status(404).json({status: "error", result: ["Question Type Not Found!"]})
        }

        return res.status(201).json({status: "success", result: [questionType]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// read all
const getAllQuestionTypes = async (req, res)=>{
    try {
        let questionTypes = await QuestionType.find();
        return res.status(201).json({status: "success", result: questionTypes});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



// delete
const deleteQuestionType = async (req, res)=>{

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        let questionType = await QuestionType.findById(req.params.id);

        if (!questionType)
        {
            return res.status(404).json({status: "error", result: ["Question Type Not Found!"]})
        }

        await QuestionType.findByIdAndDelete(req.params.id);
        return res.status(201).json({status: "success", result: ["Deleted Succuessfully..."]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



module.exports=  {createQuestionType, updateQuestionType,  getOneQuestionType, getAllQuestionTypes, deleteQuestionType};