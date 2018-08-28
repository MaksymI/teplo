import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AccountingState } from './accounting.state';

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

export const getSelectedRecord = createSelector(
  getRecordsState,
  (state: AccountingState) => state.selectedRecord
);

export const getRecordsLoaded = createSelector(
  getRecordsState,
  (state: AccountingState) => state.loaded
);
