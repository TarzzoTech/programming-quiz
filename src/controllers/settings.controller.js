const express = require("express");
const router = express.Router();
const Setting = require("../models/settings.modal");

// get all quiz entries
router.get("/", (req, res, next) => {
    Setting.find().then(settings => {
        res.status(200).json(settings[0]);
    }).catch(err => next(err));
});

module.exports = router;