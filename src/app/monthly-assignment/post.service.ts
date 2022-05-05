import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Monthly } from './monthly';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  _url = 'http://localhost:8080/api/monthly';
  constructor(private _http: HttpClient) { }

  enroll(monthly: Monthly) {
    return this._http.post<any>(this._url, monthly)
        .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
