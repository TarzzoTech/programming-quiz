import { Component, OnInit } from '@angular/core';
import { QuesViewMode } from 'src/app/models';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  QuesViewMode = QuesViewMode;
  viewMode: QuesViewMode;
  currentQuestion: number;
  totalQuestions: number;
  showSubmitBtn = false;
  questionNumberList: number[];

  constructor(private quiz: QuizService) {}

  ngOnInit() {
    this.viewMode = QuesViewMode.INSTRUCTIONS;
  }

  startQuiz(): void {
    this.updateQuizDetails(1);
    this.totalQuestions = this.quiz.getTotalQuestions();
    this.questionNumberList = [];
    for (let i = 1; i <= this.totalQuestions; i++) {
      this.questionNumberList.push(i);
    }
    this.viewMode = QuesViewMode.QUESTIONS;
  }

  onQSelect(num: number): void {
    this.updateQuizDetails(num);
  }

  updateQuizDetails(num: number): void {
    this.currentQuestion = num;
    this.quiz.onQuestionSelect.next(num - 1);
    if (num === this.totalQuestions) {
      this.showSubmitBtn = true;
    }
  }

  onSelect($event): void {
    this.quiz.updateSelectedAnswers($event);
  }

  nextQuestion(): void {
    this.updateQuizDetails((this.currentQuestion += 1));
  }

  submitQuiz(): void {
    this.viewMode = QuesViewMode.END;
    this.showSubmitBtn = false;
    this.quiz.Submit();
  }
}
