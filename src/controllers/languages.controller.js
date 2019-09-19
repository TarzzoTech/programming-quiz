const express = require("express");
const router = express.Router();
const Language = require("../models/languages.model");

router.get("/", (req, res, next) => {
    Language.find().then(languages => {
        res.status(200).json(languages);
    }).catch(err => next(err));
});

router.get("/available-languages", (req, res, next) => {
    res.status(200).json({
        result: []
    });
});

// router.post("/add-languages", (req, res, next) => {
//     Language.collection.insert(req.body.data).then((data) => {
//         res.status(200).json(data);
//     }).catch(err => next(err));
// });

router.delete("/language/:languageId", (req, res, next) => {
    res.status(200).json(true);
});
module.exports = router;