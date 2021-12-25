import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthenicationService } from './authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenicationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const appUserToken = this.authService.getTokenInfo();
    if (!appUserToken) return next.handle(req);

    const modifiedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${appUserToken.token}` },
    });
    return next.handle(modifiedReq);
  }
}
