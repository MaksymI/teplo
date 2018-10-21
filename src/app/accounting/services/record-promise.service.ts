import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Record } from '../models/record.model';

@Injectable()
export class RecordPromiseService {
  private recordsUrl = 'http://localhost:3000/record-list';

  constructor(private http: HttpClient) {}

  getRecordsObservable(): Observable<Record[]> {
    return this.http
      .get<Record[]>(this.recordsUrl)
      .pipe(catchError(this.handleErrorObservable));
  }

  getRecords(): Promise<Record[]> {
    return this.http
      .get(this.recordsUrl)
      .toPromise()
      .then(response => <Record[]>response)
      .catch(this.handleError);
  }

  getRecord(id: string ): Promise<Record> {
    const url = `${this.recordsUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => <Record[]>response)
      .catch(this.handleError);
  }


  updateRecord(record: Record): Promise<Record> {
    const url = `${this.recordsUrl}/${record._id}`;
    const body = JSON.stringify(record);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put(url, body, options)
      .toPromise()
      .then(response => <Record[]>response)
      .catch(this.handleError);
  }

  createRecord(record: Record): Promise<Record> {
    const url = `${this.recordsUrl}/add`;
    const body = JSON.stringify(record);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => <Record[]>response)
      .catch(this.handleError);
  }

  deleteRecord(record: Record): Promise<Record> {
    const url = `${this.recordsUrl}/${record._id}`;

    return this.http
      .delete(url)
      .toPromise()
      .then(response => <Record[]>response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured ', error);
    return Promise.reject(error.message || error);
  }

  private handleErrorObservable(err: HttpErrorResponse) {
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
