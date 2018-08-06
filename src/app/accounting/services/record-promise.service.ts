import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getRecord(id: number ): Promise<Record> {
    const url = `${this.recordsUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => <Record[]>response)
      .catch(this.handleError);
  }


  updateRecord(record: Record): Promise<Record> {
    const url = `${this.recordsUrl}/${record.id}`;
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

  private handleError(error: any): Promise<any> {
    console.error('An error occured ', error);
    return Promise.reject(error.message || error);
  }
}
