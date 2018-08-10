import { Action } from '@ngrx/store';
import { Record } from '../../accounting/models/record.model';

// [Accounting] - namespace
export enum AccountingActionTypes {
  GET_RECORDS = '[Accounting] GET_RECORDS',
  GET_RECORD = '[Accounting] GET_RECORD',
  CREATE_RECORD = '[Accounting] CREATE_RECORD',
  UPDATE_RECORD = '[Accounting] UPDATE_RECORD',
  DELETE_RECORD = '[Accounting] DELETE_RECORD'
}

export class GetRecords implements Action {
  readonly type = AccountingActionTypes.GET_RECORDS;
}

export class GetRecord implements Action {
  readonly type = AccountingActionTypes.GET_RECORD;
  constructor(public payload: string) {}
}

export class CreateRecord implements Action {
  readonly type = AccountingActionTypes.CREATE_RECORD;
  constructor(public payload: Record) {}
}

export class UpdateRecord implements Action {
  readonly type = AccountingActionTypes.UPDATE_RECORD;
  constructor(public payload: Record) {}
}

export class DeleteRecord implements Action {
  readonly type = AccountingActionTypes.DELETE_RECORD;
  constructor(public payload: Record) {}
}




export type AccountingActions =
  | GetRecords
  | GetRecord
  | CreateRecord
  | UpdateRecord
  | DeleteRecord;
