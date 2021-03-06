import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// NgRx
import { Store, select } from '@ngrx/store';
import { AppState, getRecordsData, getRecordsError } from '../../../+store';
import * as RecordsActions from '../../../+store/accounting/accounting.actions';

import { Observable } from 'rxjs';

import { Record } from '../../models/record.model';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records$: Observable<ReadonlyArray<Record>>;
  recordsError$: Observable<Error | string>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.records$ = this.store.pipe(select(getRecordsData));
    this.recordsError$ = this.store.pipe(select(getRecordsError));

    this.store.dispatch(new RecordsActions.GetRecords());
  }

  onSaveRecord(record: Record): void {
    console.log('record: ', record);
    const savedRecord = { ...record, saved: true };
    console.log('savedRecord: ', savedRecord);
    this.store.dispatch(new RecordsActions.UpdateRecord(savedRecord));
  }

  onEditRecord(record: Record): void {
    const link = ['/edit', record._id];
    this.router.navigate(link);
  }

  onCreateRecord(): void {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onDeleteRecord(record: Record): void {
    this.store.dispatch(new RecordsActions.DeleteRecord(record));
  }
}
