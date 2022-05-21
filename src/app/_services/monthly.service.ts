
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { Monthly } from '../monthly-assignment/monthly';
const API_URL = 'http://localhost:8080/api/monthly/';
@Injectable({
  providedIn: 'root'
})

export class MonthlyService{
  constructor(private http: HttpClient) { }

  getAllMonthly(){
      return this.http.get<Monthly[]>(API_URL + 'all');
  }

    deleteMonthly(id: number):Observable<{}> {
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

