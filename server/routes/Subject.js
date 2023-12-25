const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const { createSubject, updateSubject, getOneSubject, getAllSubjects, deleteSubject } = require("../controller/Subject");
const {validateClassId} = require("../middleware/ExistIdValidator");

// Create question type method - POST  
router.post("/", validateClassId, [
    body("name", "Enter Valid Subject Name ").isLength(1),
    body("classId", "Enter Valid Class ID").isMongoId()
], createSubject);

// Update question type method - PUT  
router.put("/:id", [
    body("name", "Enter Valid Subject Name ").isLength(1),
], updateSubject);

// Read One question type method - get  
router.get("/:id", getOneSubject);

// Read All question type method - get  
router.get("/", getAllSubjects);

// Delete question type method - DELETE  
router.delete("/:id", deleteSubject);


module.exports = router;