import { Action } from '@ngrx/store';
import { Record } from '../../accounting/models/record.model';

// [Accounting] - namespace
export enum AccountingActionTypes {
  GET_RECORDS = '[Accounting] GET_RECORDS',
  GET_RECORDS_SUCCESS = '[Accounting] GET_RECORDS_SUCCESS',
  GET_RECORDS_ERROR = '[Accounting] GET_RECORDS_ERROR',

  CREATE_RECORD = '[Accounting] CREATE_RECORD',
  CREATE_RECORD_SUCCESS = '[Accounting] CREATE_RECORD_SUCCESS',
  CREATE_RECORD_ERROR = '[Accounting] CREATE_RECORD_ERROR',

  UPDATE_RECORD = '[Accounting] UPDATE_RECORD',
  UPDATE_RECORD_SUCCESS = '[Accounting] UPDATE_RECORD_SUCCESS',
  UPDATE_RECORD_ERROR = '[Accounting] UPDATE_RECORD_ERROR',

  DELETE_RECORD = '[Accounting] DELETE_RECORD',
  DELETE_RECORD_SUCCESS = '[Accounting] DELETE_RECORD_SUCCESS',
  DELETE_RECORD_ERROR = '[Accounting] DELETE_RECORD_ERROR'
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

export class CreateRecord implements Action {
  readonly type = AccountingActionTypes.CREATE_RECORD;
  constructor(public payload: Record) {}
}

export class CreateRecordSuccess implements Action {
  readonly type = AccountingActionTypes.CREATE_RECORD_SUCCESS;
  constructor(public payload: Record) {}
}

export class CreateRecordError implements Action {
  readonly type = AccountingActionTypes.CREATE_RECORD_ERROR;
  constructor(public payload: Error | string) {}
}

export class UpdateRecord implements Action {
  readonly type = AccountingActionTypes.UPDATE_RECORD;
  constructor(public payload: Record) {}
}

export class UpdateRecordSuccess implements Action {
  readonly type = AccountingActionTypes.UPDATE_RECORD_SUCCESS;
  constructor(public payload: Record) {}
}

export class UpdateRecordError implements Action {
  readonly type = AccountingActionTypes.UPDATE_RECORD_ERROR;
  constructor(public payload: Error | string) {}
}

export class DeleteRecord implements Action {
  readonly type = AccountingActionTypes.DELETE_RECORD;
  constructor(public payload: Record) {}
}

export class DeleteRecordSuccess implements Action {
  readonly type = AccountingActionTypes.DELETE_RECORD_SUCCESS;
  constructor(public payload: Record) {}
}

export class DeleteRecordError implements Action {
  readonly type = AccountingActionTypes.DELETE_RECORD_ERROR;
  constructor(public payload: Error | string) {}
}

export type AccountingActions =
  | GetRecords
  | GetRecordsSuccess
  | GetRecordsError
  | CreateRecord
  | CreateRecordSuccess
  | CreateRecordError
  | UpdateRecord
  | UpdateRecordSuccess
  | UpdateRecordError
  | DeleteRecord
  | DeleteRecordSuccess
  | DeleteRecordError;
