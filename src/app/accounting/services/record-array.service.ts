import { Injectable } from '@angular/core';
import { Record } from '../models/record.model';

const recordList = [
  new Record(1),
  new Record(2),
  new Record(3),
  new Record(4)
]

const recordListpromise = Promise.resolve(recordList);

@Injectable({
  providedIn: 'root'
})
export class RecordArrayService {

  constructor() { }

  getRecords(): Promise<Record[]> {
    return recordListpromise;
  }

  getRecord(id: number | string): Promise<Record> {
    return this.getRecords()
      .then(records => records.find(record => record.id === +id))
      .catch(() => Promise.reject('Error in getRecord'));
  }

  addRecord(record: Record): void {
    recordList.push(record);
  }

  updateRecord(record: Record): void {
    const i = recordList.findIndex(r => r.id === record.id);

    if (i > -1) {
      recordList.splice(i, 1, record);
    }
  }

  saveRecord(record: Record): void {
    const i = recordList.findIndex(r => r.id === record.id);

    recordList[i].saved = true;
  }
}
