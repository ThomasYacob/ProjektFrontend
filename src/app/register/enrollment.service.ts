import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { User } from './user'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
const API_BASE_URL = 'http://localhost:8081/api/';


@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor(private _http: HttpClient) { }

  enroll(user: User) {
    return this._http.post<any>(API_BASE_URL + 'user', user)
        .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
