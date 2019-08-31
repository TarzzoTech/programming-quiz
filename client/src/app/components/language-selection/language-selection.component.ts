import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/models';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {

  selectedLanguage: string;
  languages: Language[] = [];

  constructor(
    private router: Router,
    private quiz: QuizService
  ) {
    this.languages = this.quiz.getLanguages();
  }

  ngOnInit() {
  }

  onChange($event) {
    this.quiz.setLanguage($event);
    this.selectedLanguage = $event;
  }

  onContinue() {
    this.router.navigate(['/quiz']);
  }

}
