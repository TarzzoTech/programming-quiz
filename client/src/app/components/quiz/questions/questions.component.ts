import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from 'src/app/models';
import { Subscription } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  question: Question;
  questionNumber: number;
  questionSelectSubscription: Subscription;
  selectedOption: string;

  constructor(private quiz: QuizService) {}

  ngOnInit() {
    this.questionSelectSubscription = this.quiz.onQuestionSelect.subscribe((qNum) => {
      this.questionNumber = qNum + 1;
      this.question = this.quiz.getQuestion(qNum);
      console.log(this.question);
    });
  }

  ngOnDestroy() {
    this.questionSelectSubscription.unsubscribe();
  }
}
