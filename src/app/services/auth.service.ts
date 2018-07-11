import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;

  constructor(public router: Router, private http: HttpClient) {
   }

  login(user: IUser) {
    const url = `/login`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, user,  {headers: headers, observe: "response"})
    .subscribe(res => console.log(res));
      // pipe(
      //   map((response: HttpResponse<IUser>) => {
      //     const data = response;
      //     if (data.status === 'success' && data.token) {
      //       const expiresAt = JSON.stringify((2.88e+7) + new Date().getTime());
      //       localStorage.setItem('access_token', data.token);
      //       localStorage.setItem('id_token', data.id);
      //       localStorage.setItem('expires_at', expiresAt);
      //       this.router.navigate(['/']);
      //       return response.json();
      //     }
      //     return response;
      //   ),
      //   catchError(this.handleError(user))
      // )
    
    // });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/']);
  }

  register(user: any) {
    const url = `/register`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, user, { headers });
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
