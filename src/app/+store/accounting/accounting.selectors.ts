import { createFeatureSelector } from '@ngrx/store';

import { AccountingState } from './accounting.state';

export const getRecordsState = createFeatureSelector<AccountingState>('records');
