
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { Monthly } from '../monthly-assignment/monthly';
const API_BASE_URL = 'http://localhost:8081/api/';
@Injectable({
  providedIn: 'root'
})

export class MonthlyService{
  constructor(private http: HttpClient) { }

  getAllMonthly(){
      return this.http.get<Monthly[]>(API_BASE_URL + 'monthly' + '/all');
  }

    deleteMonthly(id: number):Observable<{}> {
    return this.http.delete(API_BASE_URL+'monthly/'+ id)
        .pipe(catchError(this.handleError));
  }

  createMonthly(monthly : Monthly){
    return this.http.post<any>(API_BASE_URL + 'monthly',monthly)
      .pipe(catchError(this.handleError));
  }

  getCurrentMonthly(){
    return this.http.get<Monthly>(API_BASE_URL + 'monthly' + '/activeMonthly')
  }
  
  getMonthlyInactive(){
    return this.http.get<Monthly[]>(API_BASE_URL + 'monthly' + '/inactiveMonthlys')
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

