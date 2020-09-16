import { Config } from 'src/app/Config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private config: Config) {}
  hostUrl = this.config.hostUrl;

  login(model) {
    const url = this.hostUrl + '/auth/authUser';
    return this.http
      .post<any>(url, model)
      .pipe(retry(1), catchError(this.handleError));
  }

  register(model) {
    const url = this.hostUrl + '/user/registerUser';
    return this.http
      .post<any>(url, model)
      .pipe(retry(1), catchError(this.handleError));
  }

  editPassword(id, model) {
    const url = this.hostUrl + '/user/forgetPassword/' + id;
    return this.http
      .put<any>(url, model)
      .pipe(retry(1), catchError(this.handleError));
  }

  editInfo(id, model) {
    const url = this.hostUrl + '/user/editDataUser/' + id;
    return this.http
      .put<any>(url, model)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = error.error;
    }
    return throwError(errorMessage);
  }
}
