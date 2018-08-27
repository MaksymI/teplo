import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecordsActions from './accounting.actions';

import { Observable } from 'rxjs';
import { concatMap, pluck, switchMap } from 'rxjs/operators';

import { Record } from '../../accounting/models/record.model';
import { RecordPromiseService } from '../../accounting/services';

@Injectable()
export class AccountingEffects {
  constructor(
    private actions$: Actions,
    private recordPromiseService: RecordPromiseService,
    private router: Router
  ) {
    console.log('[RECORDS EFFECTS]');
  }

  @Effect()
  getRecords$: Observable<Action> = this.actions$.pipe(
    ofType(RecordsActions.AccountingActionTypes.GET_RECORDS),
    switchMap((action: RecordsActions.GetRecords) =>
      this.recordPromiseService
        .getRecords()
        .then(records => new RecordsActions.GetRecordsSuccess(records))
        .catch(err => new RecordsActions.GetRecordsError(err))
    )
  );

  @Effect()
  getRecord$: Observable<Action> = this.actions$.pipe(
    ofType(RecordsActions.AccountingActionTypes.GET_RECORD),
    pluck('payload'),
    switchMap(payload =>
      this.recordPromiseService
        .getRecord(payload.toString())
        .then(record => new RecordsActions.GetRecordSuccess(record))
        .catch(err => new RecordsActions.GetRecordsError(err))
    )
  );

  @Effect()
  updateRecord$: Observable<Action> = this.actions$.pipe(
    ofType<RecordsActions.UpdateRecord>(
      RecordsActions.AccountingActionTypes.UPDATE_RECORD
    ),
    pluck('payload'),
    concatMap((payload: Record) =>
      this.recordPromiseService
        .updateRecord(payload)
        .then(record => {
          this.router.navigate(['/record-list']);
          return new RecordsActions.UpdateRecordSuccess(record);
        })
        .catch(err => new RecordsActions.UpdateRecordError(err))
    )
  );

  @Effect()
  createRecord$: Observable<Action> = this.actions$.pipe(
    ofType<RecordsActions.CreateRecord>(
      RecordsActions.AccountingActionTypes.CREATE_RECORD
    ),
    pluck('payload'),
    concatMap((payload: Record) =>
      this.recordPromiseService
        .createRecord(payload)
        .then(record => {
          this.router.navigate(['/record-list']);
          return new RecordsActions.CreateRecordSuccess(record);
        })
        .catch(err => new RecordsActions.CreateRecordError(err))
    )
  );

  @Effect()
  deleteRecord$: Observable<Action> = this.actions$.pipe(
    ofType<RecordsActions.CreateRecord>(
      RecordsActions.AccountingActionTypes.DELETE_RECORD
    ),
    pluck('payload'),
    concatMap((payload: Record) =>
      this.recordPromiseService
        .deleteRecord(payload)
        .then(record => {
          return new RecordsActions.DeleteRecordSuccess(record);
        })
        .catch(err => new RecordsActions.DeleteRecordError(err))
    )
  );
}
