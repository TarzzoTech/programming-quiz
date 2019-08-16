import { Injectable } from '@angular/core';
import { Questions, Question } from '../models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private Questions: Question[] = Questions;
  onQuestionSelect: Subject<number> = new Subject<number>();

  constructor() { }

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

}
