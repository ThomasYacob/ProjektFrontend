import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Weekly } from './weekly';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  _url = 'http://localhost:8080/api/weekly';
  constructor(private _http: HttpClient) { }

  enroll(weekly: Weekly) {
    return this._http.post<any>(this._url, weekly)
        .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
