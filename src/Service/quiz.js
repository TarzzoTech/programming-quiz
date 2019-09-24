module.exports = {
    ScoreCalculator: (questions = [], updatedQuestions = []) => {
        let score = 0;
        let totalScore = 0;
        updatedQuestions.forEach(updated => {
            const question = questions.find(q => q.id === updated.Id);
            if (question) {
                let q = question._doc;
                totalScore += q.Score;
                if (q.Answer === updated.SelectedAnswer) {
                    score += q.Score;
                }
            }
        });
        return `${score}/${totalScore}`;
    }
}
