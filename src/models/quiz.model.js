const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Quiz = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    TopicId: {
        type: String
    },
    Score: {
        type: String
    },
    CreatedDate: {
        type: Date
    },
});

module.exports = mongoose.model("Quiz", Quiz);
