import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { MarksDashboardComponent } from './components/marks-dashboard/marks-dashboard.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { InstructionsComponent } from './components/quiz/instructions/instructions.component';
import { QuestionsComponent } from './components/quiz/questions/questions.component';
import { EndComponent } from './components/quiz/end/end.component';
import { NoRouteComponent } from './components/no-route/no-route.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'questions-list',
    component: QuestionsListComponent
  },
  {
    path: 'marks-dashboard',
    component: MarksDashboardComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: '404',
    component: NoRouteComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
