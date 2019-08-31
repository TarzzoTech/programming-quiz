import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuesViewMode } from 'src/app/models';
import { QuizService } from 'src/app/services/quiz.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  QuesViewMode = QuesViewMode;
  viewMode: QuesViewMode;
  currentQuestion: number;
  totalQuestions: number;
  showSubmitBtn = false;
  questionNumberList: number[];
  scoreSubscription: Subscription;
  scorecard: string;

  constructor(private quiz: QuizService, private auth: AuthService) {}

  ngOnInit() {
    this.viewMode = QuesViewMode.INSTRUCTIONS;
    this.scoreSubscription = this.quiz.onSubmitQuiz.subscribe((score) => {
      this.scorecard = score;
    });
  }

  ngOnDestroy() {
    this.scoreSubscription.unsubscribe();
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
    this.auth.resetAll();
  }
}
