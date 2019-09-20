const express = require("express");
const router = express.Router();
const Question = require("../models/questions.model");

// get all the question
router.get("/", (req, res, next) => {
    Question.find({ IsActive: true }).then(questions => {
        res.status(200).json(questions);
    }).catch(err => next(err));
});

// get question by question Id
router.get("/:questionId", (req, res, next) => {
    Question.findById(req.params.questionId).then(question => {
        res.status(200).json(question);
    }).catch(err => next(err));
});

// get questions based on language Id
router.get("/quiz-questions/:languageId", (req, res, next) => {
    Question.find({ LanguageId: req.params.languageId, IsActive: true }).then(questions => {
        res.status(200).json(questions);
    }).catch(err => next(err));
});

// inserting the question
router.post("/", (req, res, next) => {
    Question.collection.insert(req.body).then(question => {
        res.status(200).json(true);
    }).catch(err => next(err));
});

// update question
router.put("/:questionId", (req, res, next) => {
    Question.findByIdAndUpdate(req.params.questionId, req.body).then(question => {
        res.status(200).json(true);
    }).catch(err => next(err));
});

// set to inactive on question delete
router.delete("/:questionId", (req, res, next) => {
    Question.findById(req.params.questionId).then(question => {
        const newQuestion = { ...question._doc, IsActive: false };
        Question.findByIdAndUpdate(req.params.questionId, newQuestion).then(question => {
            res.status(200).json(true);
        }).catch(err => next(err));
    }).catch(err => next(err));
});

// undo the deleted questions by Id
router.delete("undo/:questionId", (req, res, next) => {
    Question.findById(req.params.questionId).then(question => {
        const newQuestion = { ...question._doc, IsActive: true };
        Question.findByIdAndUpdate(req.params.questionId, newQuestion).then(question => {
            res.status(200).json(true);
        }).catch(err => next(err));
    }).catch(err => next(err));
});

module.exports = router;