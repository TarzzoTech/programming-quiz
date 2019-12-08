const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const QuestionOption = new Schema({
    A: {
        type: String
    },
    B: {
        type: String
    },
    C: {
        type: String
    },
    D: {
        type: String
    }
});

const Question = new Schema({
    TopicId: {
        type: String
    },
    Title: {
        type: String
    },
    Description: {
        type: String
    },
    Options: QuestionOption,
    Answer: {
        type: String
    },
    Score: {
        type: Number
    },
    SelectedAnswers: Mixed,
    IsActive: {
        type: Boolean
    }
});

module.exports = mongoose.model("Question", Question);
