const express = require("express");
const router = express.Router();

router.post("/validate-email", (req, res, next) => {
    res.status(200).json(true);
});

router.post("/validate-password", (req, res, next) => {
    res.status(200).json(true);
});

module.exports = router;