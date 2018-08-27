import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// NgRx
import { Store, select } from '@ngrx/store';
import { AppState, AccountingState } from '../../../+store';
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
  recordState$: Observable<AccountingState>;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.record = new Record(null, null, null);

    this.recordState$ = this.store.pipe(select('records'));
    this.sub = this.recordState$.subscribe(
      recordsState => (this.record = recordsState.selectedRecord)
    );

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

    // this.recordPromiseService[this.method](record)
    //   .then(() => this.goBack())
    //   .catch(err => console.log(err));
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
