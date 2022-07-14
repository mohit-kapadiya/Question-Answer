import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-create-question-form',
  templateUrl: './create-question-form.component.html',
  styleUrls: ['./create-question-form.component.scss']
})
export class CreateQuestionFormComponent implements OnInit {

  constructor(
    private questionSvc: QuestionService,
    private router: Router
  ) { }

  questionAnsData: any
  ngOnInit(): void {
    this.getQuestionData();
  }

  /*   get question data from local storage */
  getQuestionData() {
    this.questionAnsData = this.questionSvc.getQuestionData();
    console.log(this.questionAnsData);
  }


  /*  return to form with action = 'EDIT' */
  backToForm() {
    this.router.navigate(['/question/add-question'], {
      queryParams: {
        action: 'EDIT'
      }
    })
  }

}
