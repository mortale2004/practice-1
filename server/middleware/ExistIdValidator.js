const Question = require("../model/Question");
const QuestionType = require("../model/QuestionType");
const Class = require("../model/Class");
const Subject = require("../model/Subject");
const mongoose = require("mongoose");


const validateQuestionId = async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.body.questionId))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        const question = await Question.findById(req.body.questionId);
        if (!question) {
            return res.status(404).json({ status: "error", result: ["Question Id Not Found!"] });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["Invalid Question Id!"] });
    }
}

const validateQuestionTypeId = async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.body.queTypeId))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        const questionType = await QuestionType.findById(req.body.queTypeId);
        if (!questionType) {
            return res.status(404).json({ status: "error", result: ["Question Type Id Not Found!"] });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["Invalid Question Type Id!"] });
    }
}

const validateClassId = async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.body.classId))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {

        const klass = await Class.findById(req.body.classId);

        if (!klass) {
            return res.status(404).json({ status: "error", result: ["Class Id Not Found"] });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["Invalid Class Id!"] });
    }
}

const validateSubjectId = async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.body.subjectId))
    {
        return res.status(404).json({status: "error", result: ["Invalid Mongoose Id"]});
    }

    try {
        const subject = await Subject.findById(req.body.subjectId);

        if (!subject) {
            return res.status(404).json({ status: "error", result: ["Subject Id Not Found!"] });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["Invalid Subject Id!"] });
    }
}

module.exports = { validateQuestionId, validateQuestionTypeId, validateClassId, validateSubjectId };