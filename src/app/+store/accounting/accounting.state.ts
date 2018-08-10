import { Record } from '../../accounting/models/record.model';

export interface AccountingState {
  data: ReadonlyArray<Record>;
}

export const initialAccountingState: AccountingState = {
  data: [
    new Record(null, 999, null, null),
    new Record(null, 888, null, null),
    new Record(null, 777, null, null)
  ]
};
