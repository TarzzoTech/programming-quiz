export interface Question {
  Id: string;
  Title: string;
  Description: string;
  Options: QuestionOption;
  Answer: string;
  Score?: number;
  SelectedAnswers?: string | null | undefined;
}

export interface QuestionOption {
  a: string;
  b: string;
  c: string;
  d: string;
}

export interface Answers {
  Id: string;
  Answer: string | null;
}
