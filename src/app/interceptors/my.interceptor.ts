import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // request interceptor
    let cloneRequest;
    if (req.url.includes('users')) {
      cloneRequest = req.clone({
        params: new HttpParams().set('ts_interceptor', Date.now().toString())
      });
      console.log(cloneRequest);
    } else {
      cloneRequest = req;
    }

    return next.handle(cloneRequest);
  }
}
