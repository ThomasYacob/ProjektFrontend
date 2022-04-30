import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  public username: string;
  // @ts-ignore
  public password: string;

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string) {
    return this.http.get('http://localhost:8080' + `/login`,
        { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  // @ts-ignore
  registerSuccessfulLogin(username, password) {
    // save the username to session
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
//   login(username: string, password: string): Observable<any> {
//     return this.http.post(AUTH_API + 'signin', {
//       username,
//       password
//     }, httpOptions);
//   }
//   register(username: string, email: string, password: string): Observable<any> {
//     return this.http.post(AUTH_API + 'signup', {
//       username,
//       email,
//       password
//     }, httpOptions);
//   }
// }