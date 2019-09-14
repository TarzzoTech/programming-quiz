import { Question, QuestionsEntry } from '../models';
import { generateId } from '../Utility';

export class EmptyQuestionBuilder {
  question: Question = {
    Id: '',
    Title: '',
    Description: '',
    Options: {
      a: '',
      b: '',
      c: '',
      d: ''
    },
    Answer: '',
    LanguageId: '',
    Score: 0,
    SelectedAnswers: '',
    IsActive: true
  };
}
