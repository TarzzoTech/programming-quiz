const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const mongo = require("./connector");


const PORT = process.env.PORT || 3000;

const app = express();

// DB connection
mongoose.connect(mongo.MONGODB_URI, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

// middleware
app.use(cors({
    credentials: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
    res.render('index');
});

// controllers import
const AuthController = require("./src/controllers/auth.controller");
const TopicsController = require("./src/controllers/topics.controller");
const QuestionsController = require("./src/controllers/questions.controller");
const QuizController = require("./src/controllers/quiz.controller");
const InstructionController = require("./src/controllers/instruction.controller");
const SettingController = require("./src/controllers/settings.controller");

// controllers configurations
app.use("/auth", AuthController);
app.use("/topics", TopicsController);
app.use("/questions", QuestionsController);
app.use("/quiz", QuizController);
app.use("/instructions", InstructionController);
app.use("/settings", SettingController);

app.listen(PORT, function() {
    console.log('Our app is running on http://localhost:' + PORT);
});