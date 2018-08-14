import { Record } from '../../accounting/models/record.model';

export interface AccountingState {
  data: ReadonlyArray<Record>;
}

export const initialAccountingState: AccountingState = {
  data: [
    new Record('1', 999, null, null),
    new Record('2', 888, null, null),
    new Record('3', 777, null, null)
  ]
};
