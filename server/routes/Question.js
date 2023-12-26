const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const { createQuestion, updateQuestion, getOneQuestion, getAllQuestions, deleteQuestion } = require("../controller/Question");
const { validateQuestionTypeId, validateClassId, validateSubjectId, validateSourceTagId } = require("../middleware/ExistIdValidator");

// Create question  method - POST  
router.post("/", validateQuestionTypeId, validateClassId, validateSubjectId, validateSourceTagId, [
    body("question", "Enter Valid Question").isLength(1),
    body("options", "Enter Valid Options").isArray(),
    body("solution", "Enter Correct Solution").isNumeric(),
    body("classId", "Enter Correct Class Id").isMongoId(),
    body("subjectId", "Enter Correct Subject Id").isMongoId(),
    body("queTypeId", "Enter Correct Question Type Id").isMongoId(),
    body("sourceTagId", "Enter Correct Source Tag Id").isMongoId(),
], createQuestion);

// Update question  method - PUT  
router.put("/:id", [
    body("question", "Enter Valid Question").isLength(1),
    body("options", "Enter Valid Options").isArray(),
    body("solution", "Enter Correct Solution").isNumeric(),
], updateQuestion);

// Read One question  method - get  
router.get("/:id", getOneQuestion);

// Read All question  method - get  
router.get("/", getAllQuestions);

// Delete question  method - DELETE  
router.delete("/:id", deleteQuestion);


module.exports = router;