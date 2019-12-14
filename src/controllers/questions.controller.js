const express = require("express");
const router = express.Router();
const Question = require("../models/questions.model");
const { QuestionBuilder, QuestionsListBuilder } = require('../builder/question');

// get all active question
router.get("/", (req, res, next) => {
    Question.find({ IsActive: true }).then(questions => {
        if (questions && questions.length > 0) {
            const QuestionsList = new QuestionsListBuilder(questions).getInstance();
            res.status(200).json(QuestionsList);
        } else {
            res.status(200).json([]);
        }
    }).catch(err => next(err));
});

// get all deleted question
router.get("/deleted-questions", (req, res, next) => {
    Question.find({ IsActive: false }).then(questions => {
        if (questions && questions.length > 0) {
            const QuestionsList = new QuestionsListBuilder(questions).getInstance();
            res.status(200).json(QuestionsList);
        } else {
            res.status(200).json([]);
        }
    }).catch(err => next(err));
});

// get question by question Id
router.get("/:questionId", (req, res, next) => {
    Question.findById(req.params.questionId).then(question => {
        res.status(200).json(new QuestionBuilder(question).getInstance(false));
    }).catch(err => next(err));
});

// get questions based on topic Id
router.get("/quiz-questions/:topicId", (req, res, next) => {
    Question.find({ TopicId: req.params.topicId, IsActive: true }).limit(15).then(questions => {
        if (questions && questions.length > 0) {
            let QuestionsList = new QuestionsListBuilder(questions).getInstance();
            QuestionsList = QuestionsList.map(question => {
                question.Answer = '';
                return question;
            });
            res.status(200).json(QuestionsList);
        } else {
            res.status(200).json([]);
        }
    }).catch(err => next(err));
});

// inserting the question
router.post("/", (req, res, next) => {
    Question.collection.insert(new QuestionBuilder(req.body).getInstance()).then(question => {
        res.status(200).json(question);
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
        const newQuestion = { ...new QuestionBuilder(question).getInstance(false), IsActive: false };
        Question.findByIdAndUpdate(req.params.questionId, newQuestion).then(question => {
            res.status(200).json(question);
        }).catch(err => next(err));
    }).catch(err => next(err));
});

// undo the deleted questions by Id
router.put("/undo/:questionId", (req, res, next) => {
    Question.findById(req.params.questionId).then(question => {
        const newQuestion = { ...new QuestionBuilder(question).getInstance(false), IsActive: true };
        Question.findByIdAndUpdate(req.params.questionId, newQuestion).then(question => {
            res.status(200).json(true);
        }).catch(err => next(err));
    }).catch(err => next(err));
});

module.exports = router;