import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// NgRx
import { Store, select } from '@ngrx/store';
import { AppState, AccountingState } from '../../../+store';

import { Observable } from 'rxjs';

import { Record } from '../../models/record.model';
import { RecordPromiseService } from '../../services';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records: Array<Record>;
  recordsState$: Observable<AccountingState>;

  constructor(
    private router: Router,
    private recordPromiseService: RecordPromiseService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log('We have a store! ', this.store);
    this.recordsState$ = this.store.pipe(select('records'));
  }

  onSaveRecord(record: Record): void {
    this.updateRecord(record).catch(err => console.log(err));
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
    // this.recordPromiseService
    // .deleteRecord(record)
    // .then(() => (this.records = this.records.filter(r => r._id !== record._id)))
    // .catch(err => console.log(err));
    this.deleteRecord(record).catch(err => console.log(err));
  }

  private async updateRecord(record: Record) {
    const updatedRecord = await this.recordPromiseService.updateRecord({
      ...record,
      saved: true
    });

    if (updatedRecord) {
      const index = this.records.findIndex(r => r._id === updatedRecord._id);
      if (index > -1) {
        this.records.splice(index, 1, updatedRecord);
      }
    }
  }

  private async deleteRecord(record: Record) {
    const deletedRecord = await this.recordPromiseService.deleteRecord(record);
    this.records = this.records.filter(r => r._id !== deletedRecord._id);
  }

}
