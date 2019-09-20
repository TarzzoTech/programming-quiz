const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Language = new Schema({
    Name: {
        type: String
    },
    Code: {
        type: String
    }
});

module.exports = mongoose.model("Language", Language);
