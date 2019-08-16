export interface Question {
  Id: string;
  Title: string;
  Description: string;
  Options: QuestionOption;
}

export interface QuestionOption {
  a: string;
  b: string;
  c: string;
  d: string;
}
