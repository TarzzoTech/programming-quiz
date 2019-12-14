class SettingBuilder {
    constructor(setting) {
        this.setting = setting;
    }

    getInstance(isNew = true) {
        return {
            Id: isNew ? '' : this.setting._id,
            QuizQuestionsCount: this.setting.QuizQuestionsCount,
            IsRandom: this.setting.IsRandom,
            ComplexityOptions: {},
            CreatedDate: isNew ? new Date() : this.setting.CreatedDate,
        };
    }
}

module.exports = {
    SettingBuilder
};
