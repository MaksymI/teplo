import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, delay, finalize, catchError, take } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserObservableService } from '../services';
import { SpinnerService } from '../../';

@Injectable()
export class UserResolveGuard implements Resolve<User> {
  constructor(
    private userObservableService: UserObservableService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User | null> {
    console.log('UserResolve Guard is called');

    if (!route.paramMap.has('userID')) {
      return of(new User(null, '', ''));
    }

    this.spinnerService.show();
    const id = route.paramMap.get('userID');

    return this.userObservableService.getUser(id).pipe(
      delay(2000),
      map(user => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/user']);
          return of(null);
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        return of(null);
      }),
      finalize(() => this.spinnerService.hide())
    );
  }
}
