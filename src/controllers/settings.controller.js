const express = require("express");
const router = express.Router();
const Setting = require("../models/settings.modal");
const { SettingBuilder } = require('../builder/setting');

// get all quiz entries
router.get("/", (req, res, next) => {
    Setting.find().then(settings => {
        res.status(200).json(new SettingBuilder(settings[0]).getInstance(false));
    }).catch(err => {
        res.status(200).json({});
        next(err)
    });
});

router.put("/add-or-update/:settingId", (req, res, next) => {
    if (req.params.settingId) {
        Setting.findByIdAndUpdate(req.params.settingId, new SettingBuilder(req.body).getInstance(false)).then(() => {
            res.status(200).json(true);
        }).catch(err => {
            res.status(200).json(false);
            next(err)
        });
    } else {
        Setting.collection.insert(new SettingBuilder(req.body).getInstance()).then(() => {
            res.status(200).json(true);
        }).catch(err => {
            res.status(200).json(false);
            next(err)
        });
    }
});

module.exports = router;