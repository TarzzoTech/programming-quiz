import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Question, SelectedAnswers } from 'src/app/models';
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
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSelect: EventEmitter<SelectedAnswers> = new EventEmitter<SelectedAnswers>();

  constructor(private quiz: QuizService) {}

  ngOnInit() {
    this.questionSelectSubscription = this.quiz.onQuestionSelect.subscribe((qNum) => {
      this.questionNumber = qNum + 1;
      this.question = this.quiz.getQuestion(qNum);
      this.selectedOption = this.question.SelectedAnswers;
    });
  }

  onChange($event): void {
    this.selectedOption = $event;
    this.onSelect.emit({
      Id: this.question.Id,
      Answer: $event
    });
  }

  ngOnDestroy() {
    this.questionSelectSubscription.unsubscribe();
  }
}
