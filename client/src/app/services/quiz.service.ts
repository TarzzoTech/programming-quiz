import { Injectable } from '@angular/core';
import { Questions, Question, SelectedAnswers, Languages, Language } from '../models';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private Questions: Question[] = Questions;
  private Languages: Language[] = Languages;
  selectedLanguage: string;
  onQuestionSelect: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  onSubmitQuiz: Subject<string> = new Subject<string>();
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

  setLanguage(langId: string) {
    this.selectedLanguage = langId;
  }

  getQuestions(): Question[] {
    if (this.selectedLanguage) {
      return this.Languages.find(l => l.Id === this.selectedLanguage).Questions.slice(0);
    } else {
      return [];
    }
  }

  getLanguages(): Language[] {
    return this.Languages.slice(0);
  }

  getTotalQuestions(): number {
    return this.Questions.length;
  }

  getQuestion(num: number): Question {
    if (this.selectedLanguage) {
      return this.Languages.find(l => l.Id === this.selectedLanguage).Questions[num];
    } else {
      return {} as Question;
    }
  }

  updateSelectedAnswers(answer: SelectedAnswers): void {
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
    this.onSubmitQuiz.next(`${this.TotalScore}/${this.ActualScore}`);
  }
}
