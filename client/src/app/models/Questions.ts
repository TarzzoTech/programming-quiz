export interface Question {
  Id: string;
  Title: string;
  Description: string;
  Options: QuestionOption;
  Answer: string;
  Score?: number;
  SelectedAnswers?: string | null | undefined;
}

export interface Language {
  Id: string;
  Title: string;
  Questions: Question[];
}

export interface QuestionOption {
  a: string;
  b: string;
  c: string;
  d: string;
}

export interface SelectedAnswers {
  Id: string;
  Answer: string | null;
}
