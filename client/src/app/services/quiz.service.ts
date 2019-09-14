import { Injectable } from '@angular/core';
import {
  Questions,
  Question,
  SelectedAnswers,
  Languages,
  Language,
  TOTAL_SCORE,
  ACTUAL_SCORE,
  DEFAULT_SCORE
} from '../models';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private Questions: Question[] = Questions;
  // Available Languages with questions
  private AvailableLanguages: Language[] = Languages;
  selectedLanguage: string;
  onQuestionSelect: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  TotalScore = TOTAL_SCORE;
  ActualScore = ACTUAL_SCORE;
  DefaultScore = DEFAULT_SCORE;

  constructor() { }

  private calculateActualScore() {
    this.Questions.forEach(q => {
      this.ActualScore += q.Score || this.DefaultScore;
    });
  }

  setQuestions(questions: Question[]): void {
    this.Questions = questions;
    this.calculateActualScore();
  }

  setLanguage(langId: string) {
    this.selectedLanguage = langId;
    this.setQuestions(
      this.AvailableLanguages.find(l => l.Id === this.selectedLanguage).Questions.slice(
        0
      )
    );
  }

  getQuestions(): Question[] {
    return this.Questions.slice(0);
  }

  getLanguages(): Language[] {
    return this.AvailableLanguages.slice(0);
  }

  getLanguageName(): string {
    if (this.selectedLanguage) {
      return this.AvailableLanguages.find(l => l.Id === this.selectedLanguage).Title;
    } else {
      return '';
    }
  }

  getTotalQuestions(): number {
    return this.Questions.length;
  }

  getQuestion(num: number): Question {
    if (this.selectedLanguage) {
      return this.Questions[num];
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

  calculateMyScore(): string {
    this.Questions.forEach(q => {
      if (q.Answer === q.SelectedAnswers) {
        this.TotalScore += q.Score || this.DefaultScore;
      }
    });
    return `${this.TotalScore}/${this.ActualScore}`;
  }
}
