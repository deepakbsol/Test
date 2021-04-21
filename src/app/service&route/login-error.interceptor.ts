import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';
import { UserServiceService } from '../modules/user/user-service.service';

@Injectable()
export class LoginErrorInterceptor implements HttpInterceptor {
  constructor(private userServiceService: UserServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if (err.status === 401) {
              // auto logout if 401 response returned from api
             // this.userServiceService.logout();
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
      }))
  }
}