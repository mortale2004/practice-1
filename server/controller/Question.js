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

    const queTypeId = req.query?.queTypeId;
    const classId = req.query?.classId;
    const sourceTagId = req.query?.sourceTagId;
    const subjectId = req.query?.subjectId;

    const pageNo = Number(req.query?.pageNo) || 1;
    const limit = Number(req.query?.limit) || 3;
    const skip = (pageNo - 1) * limit;

    try {


        let allQuestions;

        if (queTypeId && classId && sourceTagId && subjectId) // case 1 (a, b, c, d)
        {
            allQuestions = await Question.find({$and:[
                {queTypeId: queTypeId},
                {classId: classId},
                {sourceTagId: sourceTagId},
                {subjectId: subjectId},
            ]});
        }
        else if (queTypeId && classId && sourceTagId) // case 2 (a, b, c)
        {
            allQuestions = await Question.find({$and:[
                {queTypeId: queTypeId},
                {classId: classId},
                {sourceTagId: sourceTagId},
            ]});
        }
        else if (queTypeId && classId && subjectId) // case 3 (a, b, d)
        {
            allQuestions = await Question.find({$and:[
                {queTypeId: queTypeId},
                {classId: classId},
                {subjectId: subjectId},
            ]});
        }
        else if (queTypeId && sourceTagId && subjectId) // case 4  (a, c, d)
        {
            allQuestions = await Question.find({$and:[
                {queTypeId: queTypeId},
                {sourceTagId: sourceTagId},
                {subjectId: subjectId},
            ]});
        }
        else if (classId && sourceTagId && subjectId) // case 5  (b, c, d)
        {
            allQuestions = await Question.find({$and:[
                {classId: classId},
                {sourceTagId: sourceTagId},
                {subjectId: subjectId},
            ]});
        }
        else if (queTypeId && classId) // case 6  (a, b)
        {
            allQuestions = await Question.find({$and:[
                {queTypeId:queTypeId},
                {classId: classId},
            ]});
        }
        else if (queTypeId && sourceTagId) // case 7  (a, c)
        {
            allQuestions = await Question.find({$and:[
                {queTypeId:queTypeId},
                {sourceTagId: sourceTagId},
            ]});
        }
        else if (queTypeId && subjectId) // case 8  (a, d)
        {
            allQuestions = await Question.find({$and:[
                {queTypeId:queTypeId},
                {subjectId: subjectId},
            ]});
        }
        else if (classId && sourceTagId) // case 9  (b, c)
        {
            allQuestions = await Question.find({$and:[
                {classId:classId},
                {sourceTagId: sourceTagId},
            ]});
        }
        else if (classId && subjectId) // case 10  (b, d)
        {
            allQuestions = await Question.find({$and:[
                {classId:classId},
                {subjectId: subjectId},
            ]});
        }
        else if (sourceTagId && subjectId) // case 11  (b, d)
        {
            allQuestions = await Question.find({$and:[
                {sourceTagId:sourceTagId},
                {subjectId: subjectId},
            ]});
        }
        else if (queTypeId) // case 12  (a)
        {
            allQuestions = await Question.find({queTypeId:queTypeId});
        }
        else if (classId) // case 13  (b)
        {
            allQuestions = await Question.find({classId:classId});
        }
        else if (sourceTagId) // case 14  (c)
        {
            allQuestions = await Question.find({sourceTagId:sourceTagId});
        }
        else if (subjectId) // case 15  (d)
        {
            allQuestions = await Question.find({subjectId:subjectId});
        }
        else
        {
            allQuestions = await Question.find();
        }

        const totalQuestions = allQuestions.length;
        const questions = allQuestions.splice(skip, limit);

        return res.status(201).json({status: "success",  result:{questions:questions, total: totalQuestions}});
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