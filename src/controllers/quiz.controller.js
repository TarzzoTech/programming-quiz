const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz.model");

// get all quiz entries
router.get("/all-entries", (req, res, next) => {
    Quiz.find().then(quizEntries => {
        res.status(200).json(quizEntries);
    }).catch(err => next(err));
});

// insert quiz result
router.post("/quiz-entry", (req, res, next) => {
    Quiz.collection.insert(req.body).then(data => {
        res.status(200).json(true);
    }).catch(err => next(err));
});

module.exports = router;