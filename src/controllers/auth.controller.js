const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/user.modal");

router.post("/validate-email", (req, res, next) => {
    User.findOne({ Email: req.body.Email }).then((user) => {
        res.status(200).json(user.Name);
    }).catch(err => {
        res.status(200).json(false);
        next(err);
    });
});

router.post("/validate-password", (req, res, next) => {
    User.findOne({ Email: req.body.Email }).then((user) => {
        bcrypt.compare(req.body.Password, user.PasswordHash, (err, isMatch) => {
            res.status(200).json(isMatch);
        });
    }).catch(err => {
        res.status(200).json(false);
        next(err);
    });
});

module.exports = router;