const express = require("express");
const router = express.Router();
const Instruction = require("../models/instructions.modal");
const { InstructionBuilder } = require('../builder/instruction');

router.get("/quiz-instructions", (req, res, next) => {
    Instruction.find().then((instructions) => {
        if (instructions && instructions.length > 0) {
            res.status(200).json(new InstructionBuilder(instructions[0]).getInstance(false));
        } else {
            res.status(200).json([]);
        }
    }).catch(err => {
        res.status(200).json(false);
        next(err);
    });
});

router.put("/add-or-update/:instructionId", (req, res, next) => {
    if (req.params.instructionId) {
        Instruction.findByIdAndUpdate(req.params.instructionId, new InstructionBuilder(req.body).getInstance(false)).then(() => {
            res.status(200).json(true);
        }).catch(err => {
            res.status(200).json(false);
            next(err)
        });
    } else {
        Instruction.collection.insert(new InstructionBuilder(req.body).getInstance()).then(() => {
            res.status(200).json(true);
        }).catch(err => {
            res.status(200).json(false);
            next(err)
        });
    }
});

module.exports = router;