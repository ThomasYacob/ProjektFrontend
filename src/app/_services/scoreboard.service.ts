
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { Scoreboard } from '../score-board/scoreboard';
import { TokenStorageService } from './token-storage.service';
import { User } from '../register/user';
const API_URL = 'http://localhost:8080/api/scoreboard/';



@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  constructor(private http: HttpClient,private token: TokenStorageService) { }
  currentUser?: any;

  getAllScoreBoard(){
    return this.http.get<Scoreboard[]>(API_URL + 'all');
  }

  getUserScoreBoard(){
    this.currentUser = this.token.getUser;
    return this.http.get<Scoreboard[]>(API_URL + this.currentUser.email);
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
