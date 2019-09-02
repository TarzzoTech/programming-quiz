import { Injectable } from '@angular/core';
import { Dashboard, DashboardData, Question } from '../models';
import { DataEntry } from '../models/DataEntry';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private DashboardData: Dashboard = DashboardData;
  private QuizData: DataEntry[] = [];

  constructor() { }

  setDashboardData(dashboardData: Dashboard): void {
    this.DashboardData = dashboardData;
  }

  getDashboardData(): Dashboard {
    return JSON.parse(JSON.stringify(this.DashboardData));
  }

  dataEntry(dataList: any[] = []): DataEntry[] {
    const res = this.dataReStructure(dataList);
    this.QuizData.push(...res);
    return this.QuizData.slice(0);
  }

  setQuizData(dataEntry: DataEntry[]): void {
    this.QuizData = dataEntry;
  }

  getQuizData(): DataEntry[] {
    return this.QuizData.slice(0);
  }

  dataReStructure(dataList: any[] = []): DataEntry[] {
    const dataEntry: DataEntry[] = [];
    if (dataList.length > 0) {
      const languagesList: string[] = this.getLanguagesList(dataList);
      languagesList.forEach(language => {
        const entry: DataEntry = {} as DataEntry;
        entry.Title = language;
        entry.Questions = this.buildQuestionsList(dataList, language);
        dataEntry.push(entry);
      });
    }
    return dataEntry;
  }

  getLanguagesList(list: any[] = []): string[] {
    const languagesList: string[] = [];
    if (list.length > 0) {
      list.forEach(l => {
        if (!languagesList.includes(l.Language)) {
          languagesList.push(l.Language);
        }
      });
    }
    return languagesList;
  }

  buildQuestionsList(dataList: any[] = [], language: string): Question[] {
   const questions: Question[] = [];
   if (dataList.length > 0 && language) {
    const data = dataList.filter(d => d.Language === language);
    if (data.length > 0) {
      data.forEach(d => {
        const question: Question = {} as Question;
        question.Answer = d.Answer;
        question.Description = d.Description;
        question.Options = {
          a: d.OptionA,
          b: d.OptionB,
          c: d.OptionC,
          d: d.OptionD
        };
        question.Score = d.Score || 5;
        question.Title = d.Question;
        questions.push(question);
      });
    }
   }
   return questions;
  }

}
