import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Monthly } from './monthly';
const API_BASE_URL = 'http://localhost:8081/api/';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  
  constructor(private _http: HttpClient) { }

  enroll(monthly: Monthly) {
    return this._http.post<any>(API_BASE_URL+'monthly', monthly)
        .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
