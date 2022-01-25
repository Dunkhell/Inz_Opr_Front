import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const googleauth = localStorage.getItem("google_auth")?.replace(/^"(.*)"$/, '$1');


    const req = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        GoogleAuthorization: 'Bearer ' + googleauth
      }
    });
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
              console.error("Error Event");
          } else {
              console.log(`error status : ${error.status} ${error.statusText}`);
              switch (error.status) {
                  case 401:      //login
                      this.router.navigateByUrl("/login");
                      break;
                  case 403:     //forbidden
                      this.router.navigateByUrl("/403");
                      break;
              }
          }
      } else {
          console.error("some thing else happened");
      }
      return throwError(error);
      })
    );
  }
}