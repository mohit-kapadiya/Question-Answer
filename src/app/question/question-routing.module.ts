import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { CreateQuestionFormComponent } from './create-question-form/create-question-form.component';

const routes: Routes = [
  {
    path: 'add-question',
    component: AddQuestionComponent
  },
  {
    path: '',
    redirectTo: 'add-question',
    pathMatch: 'full'
  },
  {
    path: 'question-form',
    component: CreateQuestionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
