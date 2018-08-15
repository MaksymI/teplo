import { AccountingActions, AccountingActionTypes } from './accounting.actions';
import { AccountingState, initialAccountingState } from './accounting.state';

import { Record } from '../../accounting/models/record.model';
import { stat } from 'fs';


export function recordsReducer(
  state = initialAccountingState,
  action: AccountingActions
): AccountingState {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {
    case AccountingActionTypes.GET_RECORDS: {
      console.log('GET_RECORDS action being hadled');
      return { ...state, loading: true };
    }

    case AccountingActionTypes.GET_RECORDS_SUCCESS: {
      console.log('GET_RECORDS_SUCCESS action being hadled');
      const data = [...(<Array<Record>>action.payload)];
      return {
        ...state,
        data,
        loading: false,
        loaded: true
       };
    }

    case AccountingActionTypes.GET_RECORDS_ERROR: {
      console.log('GET_RECORDS_ERROR action being hadled');
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        error
       };
    }

    case AccountingActionTypes.GET_RECORD: {
      console.log('GET_RECORD action being hadled');
      return {
        ...state,
        loading: true
      };
    }

    case AccountingActionTypes.GET_RECORD_SUCCESS: {
      console.log('GET_RECORD_SUCCESS action being hadled');
      const selectedRecord = { ...(<Record>action.payload)};
      return {
        ...state,
        selectedRecord,
        loading: false,
        loaded: true
       };
    }

    case AccountingActionTypes.GET_RECORD_ERROR: {
      console.log('GET_RECORD_ERROR action being hadled');
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        error
       };
    }

    case AccountingActionTypes.CREATE_RECORD: {
      console.log('CREATE_RECORD action being hadled');
      return { ...state };
    }

    case AccountingActionTypes.UPDATE_RECORD: {
      console.log('UPDATE_RECORD action being hadled');
      return { ...state };
    }

    case AccountingActionTypes.DELETE_RECORD: {
      console.log('DELETE_RECORD action being hadled');
      return { ...state };
    }

    case AccountingActionTypes.SAVE_RECORD: {
      console.log('SAVE_RECORD action being hadled');

      const id = (<Record>action.payload)._id;
      const data = state.data.map(record => {
        if (record._id === id) {
          return { ...action.payload, saved: true};
        }

        return record;
      });

      return { ...state, data };
    }

    default: {
      console.log('UNKNOWN_RECORD action being hadled');
      return state;
    }
  }
}
