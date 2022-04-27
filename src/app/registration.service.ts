import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _url = 'http://localhost:8080/api/user';

  constructor(private _http: HttpClient) { }

  // @ts-ignore
  register(userData) {
    return this._http.post<any>(this._url, userData)
  }
}
