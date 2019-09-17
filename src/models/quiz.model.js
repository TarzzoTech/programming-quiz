const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Quiz = new Schema({
    Id: ObjectId,
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Score: {
        type: String
    },
    createdDate: {
        type: Date
    },
});

export default mongoose.model("Quiz", Quiz);
