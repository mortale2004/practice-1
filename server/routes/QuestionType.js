const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const { createQuestionType, updateQuestionType, getOneQuestionType, getAllQuestionTypes, deleteQuestionType } = require("../controller/QuestionType");

// Create question type method - POST  
router.post("/", [
    body("name", "Enter Valid Question Type").isLength(1)
], createQuestionType);

// Update question type method - PUT  
router.put("/:id", [
    body("name", "Enter Valid Question Type").isLength(1)
], updateQuestionType);

// Read One question type method - get  
router.get("/:id", getOneQuestionType);

// Read All question type method - get  
router.get("/", getAllQuestionTypes);

// Delete question type method - DELETE  
router.delete("/:id", deleteQuestionType);


module.exports = router;