const express = require("express");
const router = express.Router();
const Instruction = require("../models/instructions.modal");

router.get("/quiz-instructions", (req, res, next) => {
    Instruction.find().then((instructions) => {
        if (instructions && instructions.length > 0) {
            res.status(200).json(instructions[0]);
        } else {
            res.status(200).json([]);
        }
    }).catch(err => {
        res.status(200).json(false);
        next(err);
    });
});

module.exports = router;