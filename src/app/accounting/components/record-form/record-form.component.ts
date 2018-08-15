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
import { RecordPromiseService } from '../../services';
import { AutoUnsubscribe } from '../../../';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css']
})
@AutoUnsubscribe()
export class RecordFormComponent implements OnInit {
  record: Record;
  method: String;
  recordState$: Observable<AccountingState>;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private recordPromiseService: RecordPromiseService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.record = new Record(null, null, null);

    this.recordState$ = this.store.pipe(select('records'));
    this.sub = this.recordState$.subscribe(
      recordsState => (this.record = recordsState.selectedRecord)
    );

    this.route.paramMap.subscribe(params => {
      const id = params.get('recordID');
      if (id) {
        this.store.dispatch(new RecordsActions.GetRecord(id));
      }
    });
  }

  onChangeRecord() {
    const record = { ...this.record, ...{saved: false} };

    const method = record._id ? 'updateRecord' : 'createRecord';
    this.recordPromiseService[method](record)
      .then(() => this.goBack())
      .catch(err => console.log(err));
  }

  goBack(): void {
    this.location.back();
  }

}
