import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { TokenStorageService } from './token-storage.service';
import { userAnswer } from './userAnswer';
const API_BASE_URL = 'http://localhost:8081/api/';


  enum typeOfQuestion {
  Daily = 1 ,Weekly = 2,Monthly = 3
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UseranswerService {


  constructor(private http: HttpClient ,private token: TokenStorageService) { }
  private currentUser?: any;
  private currentDate?: any;

  submitAnswer(answer : any, questionId : number, typeOfQuestion : typeOfQuestion) : Observable<any>{
    this.currentUser = this.token.getUser();
    var userId = this.currentUser.id;
    return this.http.post<userAnswer>(`${API_BASE_URL}user/${userId}/userAnswers`, {
      answer,
      typeOfQuestion,
      userId,
      questionId
    })
    .pipe(catchError(this.handleError));
  }

  getAlluserAnswers(){
    return this.http.get<userAnswer[]>(`${API_BASE_URL}user/userAnswers`);
  }
  getAlluserAnswersUncorrected(){
    return this.http.get<userAnswer[]>(API_BASE_URL + "userAnswers/uncorrected");
  }

  setTocorrected(userAnswerid : number){
    return this.http.put(API_BASE_URL+ "userAnswers/" + userAnswerid, null)
    .pipe(catchError(this.handleError));
  }

  private handleError(httpError: HttpErrorResponse) {
    if(httpError.error instanceof ErrorEvent) {
      console.error('An error occurred:', httpError.error.message);
    } else {
      console.error(
          `Backend returned code ${httpError.status}, ` +
          `body was: ${httpError.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
  
}
