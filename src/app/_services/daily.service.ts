
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { Daily } from '../daily-assignment/daily';
const API_URL = 'http://localhost:8080/api/daily/';
@Injectable({
  providedIn: 'root'
})

export class DailyService{
  constructor(private http: HttpClient) { }

  getAllDaily(){
      return this.http.get<Daily[]>(API_URL + 'all');
  }

    deleteDaily(id: number):Observable<{}> {
    return this.http.delete('${this.API_URL}/${id}')
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

