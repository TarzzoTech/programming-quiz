const express = require("express");
const router = express.Router();
const Topic = require("../models/topics.model");
const Question = require("../models/questions.model");

// get list of all the topics
router.get("/", (req, res, next) => {
    Topic.find().then(topics => {
        res.status(200).json(topics);
    }).catch(err => next(err));
});

// get list of topics having questions
router.get("/available-topics", (req, res, next) => {
    Question.find({ IsActive: true }).then(questions => {
        const questionsList = questions;
        const topicsIdList = getTopicsList(questionsList);
        Topic.find().then(topics => {
            const availableTopics = topics.filter(lang => topicsIdList.includes(lang.Code));
            res.status(200).json(availableTopics);
        }).catch(err => next(err));        
    }).catch(err => next(err));
});

// add multiple topics
router.post("/add-topics", (req, res, next) => {
    Topic.collection.insert(req.body.data).then((data) => {
        res.status(200).json(data);
    }).catch(err => next(err));
});

// set inactive for all the questions by topic Id
router.delete("/:topicId", (req, res, next) => {
    Question.find({ TopicId: req.params.topicId }).then(questions => {
        questions.forEach(question => {
            const newQuestion = { ...question._doc, IsActive: false };
            Question.findByIdAndUpdate(newQuestion._id, newQuestion).then(question => {
                res.status(200).json(true);
            }).catch(err => next(err));
        });
    }).catch(err => next(err));
});

// undo all deleted questions by topic Id
router.delete("undo/:topicId", (req, res, next) => {
    Question.find({ TopicsId: req.params.topicId, IsActive: false }).then(questions => {
        questions.forEach(question => {
            const newQuestion = { ...question._doc, IsActive: true };
            Question.findByIdAndUpdate(newQuestion._id, newQuestion).then(question => {
                res.status(200).json(true);
            }).catch(err => next(err));
        });
    }).catch(err => next(err));
});

const getTopicsList = (list = []) => {
    const topicsList = [];
    if (list.length > 0) {
      list.forEach(l => {
        if (!topicsList.includes(l.TopicId)) {
          topicsList.push(l.TopicId);
        }
      });
    }
    return topicsList;
};
module.exports = router;