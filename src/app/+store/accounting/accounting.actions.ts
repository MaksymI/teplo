import { Action } from '@ngrx/store';
import { Record } from '../../accounting/models/record.model';

// [Accounting] - namespace
export enum AccountingActionTypes {
  GET_RECORDS = '[Accounting] GET_RECORDS',
  GET_RECORDS_SUCCESS = '[Accounting] GET_RECORDS_SUCCESS',
  GET_RECORDS_ERROR = '[Accounting] GET_RECORDS_ERROR',
  GET_RECORD = '[Accounting] GET_RECORD',
  CREATE_RECORD = '[Accounting] CREATE_RECORD',
  UPDATE_RECORD = '[Accounting] UPDATE_RECORD',
  DELETE_RECORD = '[Accounting] DELETE_RECORD',
  SAVE_RECORD = '[Accounting] SAVE_RECORD'
}

export class GetRecords implements Action {
  readonly type = AccountingActionTypes.GET_RECORDS;
}

export class GetRecordsSuccess implements Action {
  readonly type = AccountingActionTypes.GET_RECORDS_SUCCESS;
  constructor(public payload: Record[]) {}
}

export class GetRecordsError implements Action {
  readonly type = AccountingActionTypes.GET_RECORDS_ERROR;
  constructor(public payload: Error | string) {}
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

export class SaveRecord implements Action {
  readonly type = AccountingActionTypes.SAVE_RECORD;
  constructor(public payload: Record) {}
}




export type AccountingActions =
  | GetRecords
  | GetRecordsSuccess
  | GetRecordsError
  | GetRecord
  | CreateRecord
  | UpdateRecord
  | DeleteRecord
  | SaveRecord;
