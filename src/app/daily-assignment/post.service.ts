import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Daily } from './daily';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  _url = 'http://localhost:8080/api/daily';
  constructor(private _http: HttpClient) { }

  enroll(daily: Daily) {
    return this._http.post<any>(this._url, daily)
        .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
