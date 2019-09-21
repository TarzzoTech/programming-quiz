const express = require("express");
const router = express.Router();
const Language = require("../models/languages.model");
const Question = require("../models/questions.model");

// get list of all the languages
router.get("/", (req, res, next) => {
    Language.find().then(languages => {
        res.status(200).json(languages);
    }).catch(err => next(err));
});

// get list of languages having questions
router.get("/available-languages", (req, res, next) => {
    Question.find({ IsActive: true }).then(questions => {
        const questionsList = questions;
        const languagesIdList = getLanguagesList(questionsList);
        Language.find().then(languages => {
            const availableLanguages = languages.filter(lang => languagesIdList.includes(lang.Code));
            res.status(200).json(availableLanguages);
        }).catch(err => next(err));        
    }).catch(err => next(err));
});

// add multiple languages
router.post("/add-languages", (req, res, next) => {
    Language.collection.insert(req.body.data).then((data) => {
        res.status(200).json(data);
    }).catch(err => next(err));
});

// set inactive for all the questions by language Id
router.delete("/:languageId", (req, res, next) => {
    Question.find({ LanguageId : req.params.languageId }).then(questions => {
        questions.forEach(question => {
            const newQuestion = { ...question._doc, IsActive: false };
            Question.findByIdAndUpdate(newQuestion._id, newQuestion).then(question => {
                res.status(200).json(true);
            }).catch(err => next(err));
        });
    }).catch(err => next(err));
});

// undo all deleted questions by language Id
router.delete("undo/:languageId", (req, res, next) => {
    Question.find({ LanguageId : req.params.languageId, IsActive: false }).then(questions => {
        questions.forEach(question => {
            const newQuestion = { ...question._doc, IsActive: true };
            Question.findByIdAndUpdate(newQuestion._id, newQuestion).then(question => {
                res.status(200).json(true);
            }).catch(err => next(err));
        });
    }).catch(err => next(err));
});

const getLanguagesList = (list = []) => {
    const languagesList = [];
    if (list.length > 0) {
      list.forEach(l => {
        if (!languagesList.includes(l.LanguageId)) {
          languagesList.push(l.LanguageId);
        }
      });
    }
    return languagesList;
};
module.exports = router;