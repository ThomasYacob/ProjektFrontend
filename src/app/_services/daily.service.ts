
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { Daily } from '../daily-assignment/daily';
const API_BASE_URL = 'http://localhost:8081/api/';
@Injectable({
  providedIn: 'root'
})

export class DailyService{
  constructor(private http: HttpClient) { }

  getAllDaily(){
      return this.http.get<Daily[]>(API_BASE_URL + 'daily'+'/all');
  }

  deleteDaily(id: number):Observable<{}> {
    return this.http.delete(API_BASE_URL +'daily'+'/${id}')
        .pipe(catchError(this.handleError));
  }

  createDaily(daily : Daily){
    return this.http.post<any>(API_BASE_URL + 'daily', daily)
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

