const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComplexityOption = new Schema({
    Name: {
        type: String
    },
    Code: {
        type: String
    }
});

const Setting = new Schema({
    QuizQuestionsCount: {
        type: Number
    },
    IsRandom: {
        type: Boolean
    },
    CreatedDate: {
        type: Date
    },
    ComplexityOptions: {
        type: [ComplexityOption]
    }
});

module.exports = mongoose.model("Setting", Setting);
