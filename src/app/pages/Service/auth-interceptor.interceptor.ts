import { AuthStorageService } from 'src/app/pages/Service/auth-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private storage: AuthStorageService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let modifiedReq;

    let token = this.storage.GetToken();
    if (token) {
      let reqOptions = {
        headers: req.headers.set('x-auth-token',  token),
      };
      modifiedReq = req.clone(reqOptions);
    } else {
      modifiedReq = req.clone();
    }
    return next.handle(modifiedReq);
  }
}
