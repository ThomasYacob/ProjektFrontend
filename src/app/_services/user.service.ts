import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from "../user";
import {catchError} from "rxjs/operators";
const API_BASE_URL = 'http://localhost:8081/api/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_BASE_URL+ 'user' + '/all', { responseType: 'text' })
        .pipe(catchError(this.handleError));
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_BASE_URL+ 'user', { responseType: 'text' })
    .pipe(catchError(this.handleError));
  }

  getContentCreatorBoard(): Observable<any> {
    return this.http.get(API_BASE_URL+ 'user' + '/contentCreator', { responseType: 'text' })
        .pipe(catchError(this.handleError));
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_BASE_URL+ 'user' + '/admin', { responseType: 'text' })
        .pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>(`${API_BASE_URL}user/all`)
        .pipe(catchError(this.handleError));
  }

  deleteUser(id: number):Observable<{}> {
    return this.http.delete(`${API_BASE_URL}user/${id}`)
        .pipe(catchError(this.handleError));
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${API_BASE_URL}user/${id}`, value)
        .pipe(catchError(this.handleError));
  }

  getUserById(id: number | undefined) {
    return this.http.get<User>(`${API_BASE_URL}user/${id}`)
        .pipe(catchError(this.handleError));
  }

  registerUser(user : User){
    return this.http.post<any>(API_BASE_URL + 'user', user)
        .pipe(catchError(this.handleError))
  }

  getUserWithoutPassword(){
    return this.http.get<String[]>(`${API_BASE_URL}user/getAll`)
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
