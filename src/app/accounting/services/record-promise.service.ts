import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Record } from '../models/record.model';

@Injectable()
export class RecordPromiseService {
  private recordsUrl = 'http://localhost:3000/record-list';

  constructor(private http: HttpClient) {}

  getRecords(): Promise<Record[]> {
    return this.http
      .get(this.recordsUrl)
      .toPromise()
      .then(response => <Record[]>response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured ', error);
    return Promise.reject(error.message || error);
  }
}
