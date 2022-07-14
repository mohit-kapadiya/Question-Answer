import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  saveQuestion(questionData : any){
    localStorage.removeItem('question')
    localStorage.setItem('question' , JSON.stringify(questionData))
  }

  getQuestionData(){
    return JSON.parse(localStorage.getItem('question')|| '{}')
  }
  
}

