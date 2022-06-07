
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { Weekly } from '../weekly-assignment/weekly';
import { Daily } from '../daily-assignment/daily';
const API_BASE_URL = 'http://localhost:8081/api/';

@Injectable({
  providedIn: 'root'
})

export class WeeklyService{
  constructor(private http: HttpClient) { }

  getAllWeekly(){
      return this.http.get<Weekly[]>(API_BASE_URL+ 'weekly' +'/all');
  }

    deleteWeekly(id: number):Observable<{}> {
    return this.http.delete('${API_BASE_URL}/weekly/' + id)
        .pipe(catchError(this.handleError));
  }

  createWeekly(weekly : Weekly){
    return this.http.post<any>(API_BASE_URL + 'weekly',weekly)
        .pipe(catchError(this.handleError));
  }

  getCurrentWeekly(){
    return this.http.get<Weekly>(API_BASE_URL + 'weekly' + '/getWeekly');
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

