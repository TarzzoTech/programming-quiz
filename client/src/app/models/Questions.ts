export interface Question {
  Id: string;
  Title: string;
  Description: string;
  Options: QuestionOption;
  Answer: string;
}

export interface QuestionOption {
  a: string;
  b: string;
  c: string;
  d: string;
}
