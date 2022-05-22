import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { TokenStorageService } from './token-storage.service';
import { userAnswer } from './userAnswer';


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

  private API_URL = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient ,private token: TokenStorageService) { }
  private currentUser?: any;
  private currentDate?: any;

  submitAnswer(answer : any, questionId : number, typeOfQuestion : typeOfQuestion) : Observable<any>{
    this.currentUser = this.token.getUser();
    var userId = this.currentUser.id;
    return this.http.post<userAnswer>(`${this.API_URL}/${userId}/userAnswers`, {
      answer,
      typeOfQuestion,
      userId,
      questionId
    })
    .pipe(catchError(this.handleError));
  }

  getAlluserAnswers(){
    return this.http.get<userAnswer[]>(`${this.API_URL}/userAnswers`);
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