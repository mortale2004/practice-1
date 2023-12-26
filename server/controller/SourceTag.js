const mongoose = require("mongoose");
const {validationResult} = require("express-validator");
const SourceTag = require("../model/SourceTag"); 

// create
const createSourceTag = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }

    try {
        let sourceTag = await SourceTag.findOne({name: req.body.name});

        if (sourceTag)
        {
            return res.status(400).json({status: "error", result: ["This Source Tag Already Exist!"]});
        }
        
        sourceTag = await SourceTag.create(req.body);
        return res.status(201).json({status: "success", result: [sourceTag]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// update
const updateSourceTag = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        let sourceTag = await SourceTag.findById(req.params.id);

        if (!sourceTag)
        {
            return res.status(404).json({status: "error", result: ["Source Tag  Not Found!"]})
        }

        sourceTag = await SourceTag.findOne({name: req.body.name});

        if (sourceTag && sourceTag.name!==req.body.name)
        {
            return res.status(400).json({status: "error", result: ["This Source Tag Already Exist!"]});
        }
        
        sourceTag = await SourceTag.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(201).json({status: "success", result: [sourceTag]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



// read one
const getOneSourceTag = async (req, res)=>{
    
    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }


    try {
        let sourceTag = await SourceTag.findById(req.params.id);

        if (!sourceTag)
        {
            return res.status(404).json({status: "error", result: ["Source Tag Not Found!"]})
        }

        return res.status(201).json({status: "success", result: [sourceTag]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// read all
const getAllSourceTags = async (req, res)=>{
    try {
        let sourceTag = await SourceTag.find();
        return res.status(201).json({status: "success", result: sourceTag});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



// delete
const deleteSourceTag = async (req, res)=>{

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        let sourceTag = await SourceTag.findById(req.params.id);

        if (!sourceTag)
        {
            return res.status(404).json({status: "error", result: ["Source Tag  Not Found!"]})
        }

        await SourceTag.findByIdAndDelete(req.params.id);
        return res.status(201).json({status: "success", result: ["Deleted Succuessfully..."]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



module.exports=  {createSourceTag, updateSourceTag,  getOneSourceTag, getAllSourceTags, deleteSourceTag};