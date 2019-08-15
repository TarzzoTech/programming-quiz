import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { MarksDashboardComponent } from './components/marks-dashboard/marks-dashboard.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { InstructionsComponent } from './components/quiz/instructions/instructions.component';
import { QuestionsComponent } from './components/quiz/questions/questions.component';
import { EndComponent } from './components/quiz/end/end.component';
import { NoRouteComponent } from './components/no-route/no-route.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionsListComponent,
    MarksDashboardComponent,
    QuizComponent,
    InstructionsComponent,
    QuestionsComponent,
    EndComponent,
    NoRouteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
