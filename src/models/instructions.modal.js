const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Instruction = new Schema({
    CMS: {
        type: String
    },
});

module.exports = mongoose.model("Instruction", Instruction);
