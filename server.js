const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const mongo = require("./connector");


const PORT = 3000;

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
app.get("/", (req, res, next) => {
    res.send("Hello!");
});

// controllers import
const AuthController = require("./src/controllers/auth.controller");
const LanguagesController = require("./src/controllers/topics.controller");
const QuestionsController = require("./src/controllers/questions.controller");
const QuizController = require("./src/controllers/quiz.controller");

// controllers configurations
app.use("/auth", AuthController);
app.use("/languages", LanguagesController);
app.use("/questions", QuestionsController);
app.use("/quiz", QuizController);

app.listen(PORT);