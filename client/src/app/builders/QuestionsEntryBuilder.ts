import { QuestionsEntry, Question } from '../models';
export class QuestionsEntryBuilder {
    questionsEntry: QuestionsEntry = {
        LanguageId: '',
        Title: '',
        Description: '',
        OptionA: '',
        OptionB: '',
        OptionC: '',
        OptionD: '',
        Answer: '',
        Score: 5
    };
    constructor(defaultEntry?: Question | null) {
        if (defaultEntry) {
            this.questionsEntry.LanguageId = defaultEntry.LanguageId;
            this.questionsEntry.Answer = defaultEntry.Answer;
            this.questionsEntry.Description = defaultEntry.Description;
            this.questionsEntry.OptionA = defaultEntry.Options.a;
            this.questionsEntry.OptionB = defaultEntry.Options.b;
            this.questionsEntry.OptionC = defaultEntry.Options.c;
            this.questionsEntry.OptionD = defaultEntry.Options.d;
            this.questionsEntry.Title = defaultEntry.Title;
            this.questionsEntry.Score = defaultEntry.Score;
        }
    }
    then(cb) {
        cb(this.questionsEntry);
    }
}
