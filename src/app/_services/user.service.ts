import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from "../register/user";
import {catchError} from "rxjs/operators";
const API_URL = 'http://localhost:8080/api/user/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getContentCreatorBoard(): Observable<any> {
    return this.http.get(API_URL + 'contentCreator', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllUsers() {
    return this.http.get<User[]>(API_URL + 'all');
  }

  deleteUser(id: number):Observable<{}> {
    return this.http.delete('${this.API_URL}/${id}')
        .pipe(catchError(this.handleError));
  }

  updateUser(user: User) {
    return this.http.put('${this.API_URL}/updateuser', user)
        .pipe(catchError(this.handleError));
  }

  getUserById(id: number) {
    return this.http.get<User>('${this.baseUrl}/${id}')
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
