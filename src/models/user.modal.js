const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new Schema({
    Id: ObjectId,
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    SaltRound: {
        type: String
    }
});

export default mongoose.model("User", User);
