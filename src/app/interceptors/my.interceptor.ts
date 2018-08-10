import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    return next.handle(cloneRequest).pipe(
      // response interceptor
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response
          console.log('Response Interceptor');
          console.log(event);
          console.log(event.body);
          return event;
        }
      })
    );
  }
}
