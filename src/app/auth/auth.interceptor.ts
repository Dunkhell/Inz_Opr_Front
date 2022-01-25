import { SocialAuthService } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const googleauth = localStorage.getItem("google_auth")?.replace(/^"(.*)"$/, '$1');

    const req = request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        GoogleAuthorization: `Bearer ${googleauth}`
      }
    });
    return next.handle(req);

  }
}
