const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const { createClass, updateClass, getOneClass, getAllClasss, deleteClass } = require("../controller/Class");

// Create question type method - POST  
router.post("/", [
    body("name", "Enter Valid Class Name ").isLength(1)
], createClass);

// Update question type method - PUT  
router.put("/:id", [
    body("name", "Enter Valid Class Name ").isLength(1)
], updateClass);

// Read One question type method - get  
router.get("/:id", getOneClass);

// Read All question type method - get  
router.get("/", getAllClasss);

// Delete question type method - DELETE  
router.delete("/:id", deleteClass);


module.exports = router;