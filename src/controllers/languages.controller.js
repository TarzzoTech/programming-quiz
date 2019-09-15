const express = require("express");
const router = express.Router();

router.get("/languages", (req, res, next) => {
    res.status(200).json({
        result: []
    });
});

router.get("/available-languages", (req, res, next) => {
    res.status(200).json({
        result: []
    });
});

router.delete("/language/:languageId", (req, res, next) => {
    res.status(200).json(true);
});
module.exports = router;