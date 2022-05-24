import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Weekly } from './weekly';
const API_BASE_URL = 'http://localhost:8081/api/';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) { }

  enroll(weekly: Weekly) {
    return this._http.post<any>(API_BASE_URL + 'weekly', weekly)
        .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
