const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/user.modal");

router.post("/validate-email", (req, res, next) => {
    User.findOne({ Email: req.body.Email }, (err, user) => {
        if (!err) {
            res.status(200).json(user.Name);
        } else {
            res.status(200).json(false);
        }
    });
});

router.post("/validate-password", (req, res, next) => {
    User.findOne({ Email: req.body.Email }, (err, user) => {
        if (!err) {
            bcrypt.compare(req.body.Password, user.PasswordHash, (err, isMatch) => {
                res.status(200).json(isMatch);
            });
        } else {
            res.status(200).json(false);
        }
    });
});

module.exports = router;