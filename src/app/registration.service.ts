import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const API_BASE_URL = 'http://localhost:8081/api/';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private _http: HttpClient) { }

  // @ts-ignore
  register(userData) {
    return this._http.post<any>(API_BASE_URL + 'user', userData)
  }
}
