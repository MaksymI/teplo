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

}
