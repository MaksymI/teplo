import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';

const userList: Array<User> = [
  new User(1, 'Vasyl', 'Kilov'),
  new User(2, 'Max', 'Fedoriv'),
  new User(3, 'Alex', 'Furist')
];

const userListObservable: Observable<Array<User>> = of(userList);

@Injectable()
export class UserArrayService {
  getUsers(): Observable<User[]> {
    return userListObservable;
  }

  getUser(id: number | string): Observable<User> {
    return this.getUsers()
      .pipe(
        map((users: Array<User>) => users.find(user => user.id === +id)),
        catchError(err => throwError('Error in getUser method'))
      );
  }

  addUser(user: User): void {
    userList.push(user);
  }

  updateUser(user: User): void {
    const i = userList.findIndex(u => u.id === user.id);
    if(i > -1) {
      userList.splice(i, 1, user);
    }
  }
  constructor() { }
}
