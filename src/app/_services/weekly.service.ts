
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { Weekly } from '../weekly-assignment/weekly';
const API_URL = 'http://localhost:8080/api/weekly/';
@Injectable({
  providedIn: 'root'
})

export class WeeklyService{
  constructor(private http: HttpClient) { }

  getAllWeekly(){
      return this.http.get<Weekly[]>(API_URL + 'all');
  }

    deleteWeekly(id: number):Observable<{}> {
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

