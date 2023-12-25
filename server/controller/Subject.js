const mongoose = require("mongoose");
const {validationResult} = require("express-validator");
const Subject = require("../model/Subject"); 

// create
const createSubject = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }

    try {
        let subject = await Subject.findOne({name: req.body.name});

        if (subject)
        {
            return res.status(400).json({status: "error", result: ["This Subject Already Exist!"]});
        }
        
        subject = await Subject.create(req.body);
        return res.status(201).json({status: "success", result: [subject]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// update
const updateSubject = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }


    try {
        let subject = await Subject.findById(req.params.id);

        if (!subject)
        {
            return res.status(404).json({status: "error", result: ["Subject  Not Found!"]})
        }

        subject = await Subject.findOne({name: req.body.name});

        if (subject && subject.name!==req.body.name)
        {
            return res.status(400).json({status: "error", result: ["This Subject Already Exist!"]});
        }
        
        subject = await Subject.findByIdAndUpdate(req.params.id, {...subject, ...req.body}, {new: true});
        return res.status(201).json({status: "success", result: [subject]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



// read one
const getOneSubject = async (req, res)=>{

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        let subject = await Subject.findById(req.params.id);

        if (!subject)
        {
            return res.status(404).json({status: "error", result: ["Subject Not Found!"]})
        }

        return res.status(201).json({status: "success", result: [subject]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// read all
const getAllSubjects = async (req, res)=>{
    try {
        let subject = await Subject.find();
        return res.status(201).json({status: "success", result: subject});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



// delete
const deleteSubject = async (req, res)=>{

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }


    try {
        let subject = await Subject.findById(req.params.id);

        if (!subject)
        {
            return res.status(404).json({status: "error", result: ["Subject  Not Found!"]})
        }

        await Subject.findByIdAndDelete(req.params.id);
        return res.status(201).json({status: "success", result: ["Deleted Succuessfully..."]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



module.exports=  {createSubject, updateSubject,  getOneSubject, getAllSubjects, deleteSubject};