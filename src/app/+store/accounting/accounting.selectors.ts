import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AccountingState } from './accounting.state';
import { getRouterState } from './../router';
import { Record } from '../../accounting/models/record.model';

export const getRecordsState = createFeatureSelector<AccountingState>(
  'records'
);

export const getRecordsData = createSelector(
  getRecordsState,
  (state: AccountingState) => state.data
);

export const getRecordsError = createSelector(
  getRecordsState,
  (state: AccountingState) => state.error
);

export const getRecordsLoaded = createSelector(
  getRecordsState,
  (state: AccountingState) => state.loaded
);

export const getSelectedRecordByUrl = createSelector(
  getRecordsData,
  getRouterState,
  (records, router): Record => {
    const recordID = router.state.params.recordID;
    if (recordID) {
      return records.find(record => record._id === recordID);
    } else {
      return new Record(null, null, null);
    }
  }
);
