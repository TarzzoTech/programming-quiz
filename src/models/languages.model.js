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

export default mongoose.model("Language", Language);
