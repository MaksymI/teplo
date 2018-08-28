import { Record } from '../../accounting/models/record.model';

export interface AccountingState {
  data: ReadonlyArray<Record>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialAccountingState: AccountingState = {
  data: [],
  loading: false,
  loaded: false,
  error: null
};
