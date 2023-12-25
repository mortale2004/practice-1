const mongoose = require("mongoose");
const {validationResult} = require("express-validator");
const Class = require("../model/Class"); 

// create
const createClass = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }

    try {
        let klass = await Class.findOne({name: req.body.name});

        if (klass)
        {
            return res.status(400).json({status: "error", result: ["This Class Already Exist!"]});
        }
        
        klass = await Class.create(req.body);
        return res.status(201).json({status: "success", result: [klass]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// update
const updateClass = async (req, res)=>{
    if (!validationResult(req).isEmpty())
    {
        return res.status(401).json({status: "error", result: validationResult(req).errors.map(error=>error.msg)})
    }

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        let klass = await Class.findById(req.params.id);

        if (!klass)
        {
            return res.status(404).json({status: "error", result: ["Class  Not Found!"]})
        }

        klass = await Class.findOne({name: req.body.name});

        if (klass && klass.name!==req.body.name)
        {
            return res.status(400).json({status: "error", result: ["This Class Already Exist!"]});
        }
        
        klass = await Class.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(201).json({status: "success", result: [klass]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



// read one
const getOneClass = async (req, res)=>{
    
    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }


    try {
        let klass = await Class.findById(req.params.id);

        if (!klass)
        {
            return res.status(404).json({status: "error", result: ["Class Not Found!"]})
        }

        return res.status(201).json({status: "success", result: [klass]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}

// read all
const getAllClasss = async (req, res)=>{
    try {
        let klass = await Class.find();
        return res.status(201).json({status: "success", result: klass});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



// delete
const deleteClass = async (req, res)=>{

    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        let klass = await Class.findById(req.params.id);

        if (!klass)
        {
            return res.status(404).json({status: "error", result: ["Class  Not Found!"]})
        }

        await Class.findByIdAndDelete(req.params.id);
        return res.status(201).json({status: "success", result: ["Deleted Succuessfully..."]});


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result: ["Internal Server Error!"]});
    }
}



module.exports=  {createClass, updateClass,  getOneClass, getAllClasss, deleteClass};