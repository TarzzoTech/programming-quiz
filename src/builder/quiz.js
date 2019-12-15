class QuizListBuilder {
    constructor(quizList) {
        this.quizList = quizList;
    }

    getInstance() {
        return this.quizList.map(quiz => {
            return {
                Id: quiz._id,
                Name: quiz.Name,
                Email: quiz.Email,
                TopicId: quiz. TopicId,
                Score: quiz.Score,
                CreatedDate: quiz.CreatedDate
            }
        });
    }
}

module.exports = {
    QuizListBuilder
};
