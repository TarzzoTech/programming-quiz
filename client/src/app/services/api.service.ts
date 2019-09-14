import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { User, Question, LanguagesList, LanguageStructure } from '../models';

const storage = localStorage;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  // APIs related to authentication

  // to check the email is admin's email
  validateEmail(email: string): boolean {
    return email === User.EmailId;
  }

  // validating the admin's password
  validatePwd(pwd: string) {
    return bcrypt.compare(pwd, User.PwdHash);
  }

  // ------------------------------------------------------------------------------------------------------------------------

  // APIs related to Quiz

  // get all the user's quiz data
  getQuizDataCollection() {
    return new Promise((resolve, reject) => {
      try {
        const quizDataCollectionSting = storage.getItem('QuizDataCollection');
        let quizDataCollection: Question[] = [];
        if (quizDataCollectionSting) {
          quizDataCollection = JSON.parse(quizDataCollectionSting);
        } else {
          storage.setItem('QuizDataCollection', JSON.stringify(quizDataCollection));
        }
        resolve(quizDataCollection);
      } catch (error) {
        reject('Fetching Quiz Data Collection is failed!');
      }
    });
  }

  // insert user's quiz data
  insertUserQuiz(data: any) {
    return new Promise((resolve, reject) => {
      try {
        const quizDataCollectionSting = storage.getItem('QuizDataCollection');
        let quizDataCollection: Question[] = [];
        if (quizDataCollectionSting) {
          quizDataCollection = JSON.parse(quizDataCollectionSting);
        }
        quizDataCollection.push(data);
        storage.setItem('QuizDataCollection', JSON.stringify(quizDataCollection));
        resolve(quizDataCollection);
      } catch (error) {
        reject('Inserting Quiz Data is failed!');
      }
    });
  }

  // ------------------------------------------------------------------------------------------------------------------------

  // APIs related to Questions

  // get all languages
  getLanguagesCollection() {
    return new Promise((resolve, reject) => {
      try {
        const languagesCollectionSting = storage.getItem('LanguagesCollection');
        let languagesCollection: LanguageStructure[] = [];
        if (languagesCollectionSting) {
          languagesCollection = JSON.parse(languagesCollectionSting);
        } else {
          languagesCollection = LanguagesList;
          storage.setItem('LanguagesCollection', JSON.stringify(languagesCollection));
        }
        resolve(languagesCollection);
      } catch (error) {
        reject('Fetching Languages Collection is failed!');
      }
    });
  }

  // get all questions
  getAllQuestions() {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
        }
        resolve(questionsList);
      } catch (error) {
        reject('Fetching questions list is failed!');
      }
    });
  }

  // get question
  getQuestion(questionId: string) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        let question = {} as Question;
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          const questionObj = questionsList.find(q => q.Id === questionId);
          if (question) {
            question = questionObj;
          }
        } else {
          storage.setItem('QuestionsList', JSON.stringify(questionsList));
        }
        resolve(question);
      } catch (error) {
        reject('Fetching question is failed!');
      }
    });
  }

  // get the list of questions by language
  getQuestionsByLanguage(languageId: string) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          questionsList = questionsList.filter(q => q.LanguageId === languageId);
        }
        resolve(questionsList);
      } catch (error) {
        reject('Fetching questions by language is failed!');
      }
    });
  }

  // insert question
  insertQuestion(question: Question) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
        }
        questionsList.push(question);
        storage.setItem('QuestionsList', JSON.stringify(questionsList));
        resolve(questionsList);
      } catch (error) {
        reject('Inserting question is failed!');
      }
    });
  }

  // update question
  updateQuestion(questionId: string, question: Question) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          const questionObj = questionsList.find(q => q.Id === questionId);
          if (questionObj) {
            questionsList = questionsList.map(q => {
              if (q.Id === questionId) {
                q = { ...question, Id: q.Id };
              }
              return q;
            });
          } else {
            questionsList.push(question);
          }
        }
        storage.setItem('QuestionsList', JSON.stringify(questionsList));
        resolve(questionsList);
      } catch (error) {
        reject('Updating question is failed!');
      }
    });
  }

  // delete question
  deleteQuestion(questionId: string) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          const questionObj = questionsList.find(q => q.Id === questionId);
          if (questionObj) {
            questionsList = questionsList.map(q => {
              if (q.Id === questionId) {
                q.IsActive = false;
              }
              return q;
            });
          }
        }
        storage.setItem('QuestionsList', JSON.stringify(questionsList));
        resolve(questionsList);
      } catch (error) {
        reject('Deleting question is failed!');
      }
    });
  }

  // delete entire language
  deleteRecord(languageId: string) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          questionsList = questionsList.map(q => {
            if (q.LanguageId === languageId) {
              q.IsActive = false;
            }
            return q;
          });
        }
        storage.setItem('QuestionsList', JSON.stringify(questionsList));
        resolve(questionsList);
      } catch (error) {
        reject('Deleting question is failed!');
      }
    });
  }
}
