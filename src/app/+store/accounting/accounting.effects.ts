import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecordsActions from './accounting.actions';

import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { RecordPromiseService } from '../../accounting/services';


@Injectable()
export class AccountingEffects {

  constructor(
    private actions$: Actions,
    private recordPromiseService: RecordPromiseService
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
}
