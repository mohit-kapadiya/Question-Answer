import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';



@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  questionForm!: FormGroup;
  action: string = ''

  /* select type array */
  selectType = [
    { id: 'short-text', name: 'Short text' },
    { id: 'long-text', name: 'Long text' },
    { id: 'radio-button', name: 'Radio button' }
  ];


  ngOnInit(): void {
    this.initQuestionForm();
    this.getQueryParams();

  }

  /* pass queryparam for which action should be calll , ADD or EDIT */
  getQueryParams() {
    this.activateRoute.queryParams.subscribe(
      query => {
        const queryData = query;
        this.action = queryData['action'];
        if (this.action === 'EDIT') {
          this.setFormValue();
          this.changeDetectorRef.detectChanges();
        }
      }
    )
  }


  /*   question Form initialization   */
  initQuestionForm() {
    this.questionForm = new FormGroup({
      questions: this.fb.array([]),
    })
  }

  /*   question Form fields   */
  getQuestionField() {
    return this.fb.group({
      question: ['', Validators.required],
      questionType: ['', Validators.required],
      answers: this.fb.array([])
    })
  }

  /*   answer array initialization   */
  getAnswerField() {
    return this.fb.group({
      firstAnswer: ['', Validators.required],
    })
  }


  /* Question Array */
  get questions(): any {
    return this.questionForm.get('questions') as FormArray
  }


  /*  change event of question type   */
  changeQuestionType(event: any, questionIndex: number) {
    if (event.target.value !== 'radio-button') {
      (this.questions.at(questionIndex).get('answers') as FormArray).clear();
    }
    else {
      this.answers(questionIndex).push(this.getAnswerField());
      this.answers(questionIndex).push(this.getAnswerField());
    }
  }


  /*  add more questions method   */
  addMoreQuestion() {
    this.questionForm.markAllAsTouched();
    if (this.questionForm.invalid) {
      return;
    }
    this.questions.push(this.getQuestionField());
  }

  /* answers array */
  answers(questionId: number): any {
    return this.questions
      .at(questionId)
      .get('answers') as FormArray;
  }

  /* add more answer method   */
  addMoreAnswer(questionId: number) {
    this.questionForm.markAllAsTouched();
    if (this.questionForm.invalid) {
      return;
    }
    this.answers(questionId).push(this.getAnswerField());
  }

  /* save question method   */
  saveQuestion() {
    this.questionForm.markAllAsTouched();
    if (this.questionForm.invalid) {
      return;
    }
    const questionFormValue = this.questionForm.value;
    if (this.questions.length > 0) {
      this.questionService.saveQuestion(questionFormValue);
      const message = 'Save data successfully'
      this.snackBar.open(message, 'OK', {
        duration: 3000,
        panelClass: 'red',
        verticalPosition: 'top',
      });
      this.router.navigate(['/question/question-form'])
    }

  }

  /*  set/patch value of  Form   */
  setFormValue() {
    const questionAnsData = this.questionService.getQuestionData();
    const questionArray = questionAnsData.questions
    for (let i = 0; i < questionArray.length; i++) {
      const questionForm = this.fb.group({
        question: questionArray[i]?.question,
        questionType: questionArray[i]?.questionType,
        answers: this.fb.array([])
      })
      this.questions.push(questionForm)

      for (let j = 0; j < questionArray[i].answers.length; j++) {
        const answerForm = this.fb.group({
          firstAnswer: questionArray[i].answers[j].firstAnswer
        })
        this.answers(i).push(answerForm)
      }
    }
  }

  /*  delete answer data   */
  deleteAnswer(questionId: number, ansIndex: number) {
    this.questionForm.markAllAsTouched();
    if (this.questionForm.invalid) {
      return;
    }
    this.answers(questionId).removeAt(ansIndex);
    const message = 'Delete answer successfully'
    this.snackBar.open(message, 'OK', {
      duration: 1000,
      panelClass: 'red',
      verticalPosition: 'top',
    });
  }

  /*   delete question data    */
  deleteQuestion(questionId: number) {
    this.questionForm.markAllAsTouched();
    if (this.questionForm.invalid) {
      return;
    }
    this.questions.removeAt(questionId);
    const message = 'Delete question successfully'
    this.snackBar.open(message, 'OK', {
      duration: 1000,
      panelClass: 'red',
      verticalPosition: 'top',
    });
  }


}
