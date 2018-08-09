import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UsersAPI } from '../users.config';

@Injectable()
export class UserObservableService {
  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError));
  }

  getUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http
      .get<User>(url).pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user._id}`;
    const body = JSON.stringify(user);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put<User>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  createUser(user: User): Observable<User> {
    const url = this.usersUrl;
    const body = JSON.stringify(user);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post<User>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  deleteUser(user: User): Observable<User[]> {
    const url = `${this.usersUrl}/${user._id}`;

    // return this.http.delete<User>(url);
    return this.http.delete(url).pipe(concatMap(() => this.getUsers()));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    // A client-side or network error occured.
    if (err.error instanceof Error) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
    // The backend returned an unsucessful response code.
    // The response body ay contain clues as to what went wrong.
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
