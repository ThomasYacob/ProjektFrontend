import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
const API_BASE_URL = 'http://localhost:8081/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  // @ts-ignore
  public username: string;
  // @ts-ignore
  public password: string;

    


  constructor(private http: HttpClient) {

  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_BASE_URL + `user/login`, {
      username,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(API_BASE_URL + 'user/refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    // @ts-ignore
    this.username = null;
    // @ts-ignore
    this.password = null;
  }

  isLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if(user == null) return false
    return true
  }

  getLoggedInUsername() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if(user == null) return ''
    return user
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// const AUTH_API = 'http://localhost:8080/';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private http: HttpClient) { }
//
//   login(username: string, password: string): Observable<any> {
//     return this.http.get(AUTH_API + 'api/user/login', {
//       // authorization: this.createBasuc
//       // }
//       username,
//       password
//     }, httpOptions);
//   }
//
//
//   register(username: string, email: string, password: string): Observable<any> {
//     return this.http.post(AUTH_API + 'signup', {
//       username,
//       email,
//       password
//     }, httpOptions);
//   }
// }