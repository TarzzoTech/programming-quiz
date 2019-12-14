const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz.model");
const Question = require("../models/questions.model");
const scoreCalculator = require("../service/quiz").ScoreCalculator;
const { QuizListBuilder } = require('../builder/quiz');

// get all quiz entries
router.get("/all-entries", (req, res, next) => {
    Quiz.find().then(quizEntries => {
        res.status(200).json(new QuizListBuilder(quizEntries).getInstance());
    }).catch(err => next(err));
});

// insert quiz result
router.post("/quiz-entry", (req, res, next) => {
    Question.find({ TopicId: req.body.SelectedTopic, IsActive: true }).limit(15).then(questions => {
        const Score = scoreCalculator(questions, req.body.QuestionEntry);
        const quizData = {
            Name: req.body.Name,
            Email: req.body.Email,
            TopicId: req.body.SelectedTopic,
            Score,
            CreatedDate: new Date()
        };
        Quiz.collection.insert(quizData).then(data => {
            res.status(200).json(Score);
        }).catch(err => next(err));
    }).catch(err => next(err));
});

module.exports = router;