const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Instruction = new Schema({
    CMS: {
        type: String
    },
    CreatedDate: {
        type: Date
    }
});

module.exports = mongoose.model("Instruction", Instruction);
