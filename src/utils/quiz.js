module.exports = {
    scoreCalculator: (questions = [], updatedQuestions = []) => {
        let score = 0;
        let totalScore = 0;
        updatedQuestions.forEach(updated => {
            const question = questions.find(q => q.id === updated.Id);
            if (question) {
                let q = question._doc;
                totalScore += q.Score;
                if (q.Answer === updated.SelectedAnswers) {
                    score += q.Score;
                }
            }
        });
        return `${score}/${totalScore}`;
    },
    fillAnswers: (questions = [], updatedQuestions = []) => {
        const qList = [];
        updatedQuestions.forEach(updated => {
            const question = questions.find(q => q.id === updated.Id);
            if (question) {
                question.SelectedAnswers = updated.SelectedAnswers;
            }
            qList.push(question);
        });
        return qList;
    }
}
