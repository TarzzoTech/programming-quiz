const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        result: []
    });
});

router.get("/:questionId", (req, res, next) => {
    res.status(200).json({
        result: {}
    });
});

router.get("/quiz-questions", (req, res, next) => {
    res.status(200).json({
        result: []
    });
});

router.post("/", (req, res, next) => {
    res.status(200).json(true);
});

router.put("/:questionId", (req, res, next) => {
    res.status(200).json(true);
});

router.delete("/:questionId", (req, res, next) => {
    res.status(200).json(true);
});

module.exports = router;