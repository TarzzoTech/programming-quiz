const express = require("express");
const router = express.Router();

router.get("/all-entries", (req, res, next) => {
    res.status(200).json({
        result: []
    });
});

router.post("/quiz-entry", (req, res, next) => {
    res.status(200).json(true);
});

module.exports = router;