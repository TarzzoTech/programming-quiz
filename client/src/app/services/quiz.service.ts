import { Injectable } from '@angular/core';
import { Questions, Question, Answers } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private Questions: Question[] = Questions;
  onQuestionSelect: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  TotalScore = 0;
  ActualScore = 0;

  constructor() {
    this.Questions.forEach(q => {
      this.ActualScore += q.Score || 1;
    });
  }

  setQuestions(questions: Question[]): void {
    this.Questions = questions;
  }

  getQuestions(): Question[] {
    return this.Questions.slice(0);
  }

  getTotalQuestions(): number {
    return this.Questions.length;
  }

  getQuestion(num: number): Question {
    return JSON.parse(JSON.stringify(this.Questions[num]));
  }

  updateSelectedAnswers(answer: Answers): void {
    this.Questions = this.Questions.map(sa => {
      if (sa.Id === answer.Id) {
        sa.SelectedAnswers = answer.Answer;
      }
      return sa;
    });
  }

  Submit(): void {
    this.Questions.forEach(q => {
      if (q.Answer === q.SelectedAnswers) {
        this.TotalScore += q.Score || 1;
      }
    });
    console.log(this.TotalScore, '/', this.ActualScore);
  }
}
