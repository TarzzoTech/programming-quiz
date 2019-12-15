const express = require("express");
const router = express.Router();
const Topic = require("../models/topics.model");
const Question = require("../models/questions.model");
const { getTopicsIdList } = require('../utils/topics');
const { QuestionBuilder } = require('../builder/question');
const { TopicBuilder, TopicsListBuilder } = require('../builder/topic');

// get list of all the topics
router.get("/", (req, res, next) => {
    Topic.find().then(topics => {
        res.status(200).json(new TopicsListBuilder(topics).getInstance());
    }).catch(err => next(err));
});

// get list of topics having questions
router.get("/available-topics", (req, res, next) => {
    Question.find({ IsActive: true }).then(questions => {
        const questionsList = questions;
        const topicsIdList = getTopicsIdList(questionsList);
        Topic.find().then(topics => {
            const availableTopics = topics.filter(topic => topicsIdList.includes(topic.Code));
            res.status(200).json(new TopicsListBuilder(availableTopics).getInstance());
        }).catch(err => next(err));
    }).catch(err => next(err));
});

// add topics
router.post("/add-topics", (req, res, next) => {
    Topic.collection.insert(new TopicBuilder(req.body).getInstance()).then(() => {
        Topic.find().then(topics => {
            res.status(200).json(new TopicsListBuilder(topics).getInstance());
        }).catch(err => next(err));
    }).catch(err => next(err));
});

// delete topic
router.delete("/:topicId", (req, res, next) => {
    Topic.deleteOne({ TopicId: req.params.topicId }).then(() => {
        Topic.find().then(topics => {
            res.status(200).json(new TopicsListBuilder(topics).getInstance());
        }).catch(err => next(err));
    }).catch(err => next(err));
});

// set inactive for all the questions by topic Id
router.delete("/questions/:topicId", (req, res, next) => {
    Question.find({ TopicId: req.params.topicId }).then(questions => {
        questions.forEach(question => {
            const newQuestion = { ...new QuestionBuilder(question).getInstance(false), IsActive: false };
            Question.findByIdAndUpdate(newQuestion.Id, newQuestion).then(question => {
                res.status(200).json(true);
            }).catch(err => next(err));
        });
    }).catch(err => next(err));
});

// undo all deleted questions by topic Id
router.put("/questions/undo/:topicId", (req, res, next) => {
    Question.find({ TopicsId: req.params.topicId, IsActive: false }).then(questions => {
        questions.forEach(question => {
            const newQuestion = { ...new QuestionBuilder(question).getInstance(false), IsActive: true };
            Question.findByIdAndUpdate(newQuestion.Id, newQuestion).then(question => {
                res.status(200).json(true);
            }).catch(err => next(err));
        });
    }).catch(err => next(err));
});

module.exports = router;