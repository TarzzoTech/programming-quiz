const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Topic = new Schema({
    Name: {
        type: String
    },
    Code: {
        type: String
    },
    CreatedDate: {
        type: Date
    }
});

module.exports = mongoose.model("Topic", Topic);
