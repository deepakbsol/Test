import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from '../modules/user/user-service.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {UserAuth } from 'src/app/modules/user/model/User';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  uaerAuth:UserAuth=new UserAuth();
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes("oauth/token") || req.url.includes("api/public")) {
      return next.handle(req)
    } else {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+this.uaerAuth.getToken()
        }
      });
      return next.handle(req);
    }
  }
}