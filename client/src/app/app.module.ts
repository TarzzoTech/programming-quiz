import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

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
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from './services/quiz.service';
import { ApiService } from './services/api.service';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { TrashComponent } from './components/trash/trash.component';

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
    NoRouteComponent,
    DataEntryComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule
  ],
  providers: [
    AuthService,
    QuizService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
