import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// NgRx
import { Store, select } from '@ngrx/store';
import { AppState, getSelectedRecord } from '../../../+store';
import * as RecordsActions from '../../../+store/accounting/accounting.actions';
// RxJs
import { Observable, Subscription } from 'rxjs';

import { Record } from '../../models/record.model';

import { AutoUnsubscribe } from '../../../';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
@AutoUnsubscribe()
export class RecordFormComponent implements OnInit {
  record: Record;
  method: string;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.sub = this.store.pipe(select(getSelectedRecord))
    .subscribe(record => {
      if (record) {
        this.record = record;
      } else {
        this.record = new Record(null, null, null);
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('recordID');
      this.method = id ? 'updateRecord' : 'createRecord';
      if (id) {
        this.store.dispatch(new RecordsActions.GetRecord(id));
      }
    });
  }

  onChangeRecord() {
    const record = { ...this.record, ...{ saved: false } };

    if (record._id) {
      this.store.dispatch(new RecordsActions.UpdateRecord(record));
    } else {
      this.store.dispatch(new RecordsActions.CreateRecord(record));
    }
  }

  goBack(): void {
    this.location.back();
  }
}
