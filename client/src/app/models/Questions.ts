export interface Question {
  Id: string;
  LanguageId: string;
  Title: string;
  Description: string;
  Options: QuestionOption;
  Answer: string;
  Score?: number;
  SelectedAnswers?: string | null | undefined;
  IsActive: boolean;
}

export interface Language {
  Id: string;
  Title: string;
  Questions: Question[];
}

export interface LanguageStructure {
  name: string;
  code: string;
}

export interface QuestionOption {
  a: string;
  b: string;
  c?: string;
  d?: string;
}

export interface SelectedAnswers {
  Id: string;
  Answer: string | null;
}

export interface QuestionsEntry {
  LanguageId: string;
  Title: string;
  Description: string;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  OptionD: string;
  Answer: string;
  Score: number;
}
