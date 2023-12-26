const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const { createSourceTag, updateSourceTag, getOneSourceTag, getAllSourceTags, deleteSourceTag } = require("../controller/SourceTag");

// Create question type method - POST  
router.post("/", [
    body("name", "Enter Valid Source Tag Name ").notEmpty().isIn(["Unknown", "PYQ", "Navneet", "NCERT"])
], createSourceTag);

// Update question type method - PUT  
router.put("/:id", [
    body("name", "Enter Valid Source Tag Name ").notEmpty().isIn(["Unknown", "PYQ", "Navneet", "NCERT"])
], updateSourceTag);

// Read One question type method - get  
router.get("/:id", getOneSourceTag);

// Read All question type method - get  
router.get("/", getAllSourceTags);

// Delete question type method - DELETE  
router.delete("/:id", deleteSourceTag);


module.exports = router;