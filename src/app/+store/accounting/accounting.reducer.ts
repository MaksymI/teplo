import { AccountingActions, AccountingActionTypes } from './accounting.actions';
import { AccountingState, initialAccountingState } from './accounting.state';

import { Record } from '../../accounting/models/record.model';

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
        loaded: true,
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

    case AccountingActionTypes.CREATE_RECORD: {
      console.log('CREATE_RECORD action being hadled');
      return { ...state };
    }

    case AccountingActionTypes.CREATE_RECORD_SUCCESS: {
      console.log('CREATE_RECORD_SUCCESS action being hadled');
      const record = { ...(<Record>action.payload) };
      const data = [...state.data, record];

      return {
        ...state,
        data
      };
    }

    case AccountingActionTypes.CREATE_RECORD_ERROR: {
      console.log('CREATE_RECORD_ERROR action being hadled');
      const error = action.payload;
      return {
        ...state,
        error
      };
    }

    case AccountingActionTypes.UPDATE_RECORD: {
      console.log('UPDATE_RECORD action being hadled');
      return { ...state };
    }

    case AccountingActionTypes.UPDATE_RECORD_SUCCESS: {
      console.log('UPDATE_RECORD_SUCCESS action being hadled');
      const record = { ...(<Record>action.payload) };
      const data = [...state.data];
      const index = data.findIndex(r => r._id === record._id);

      data[index] = record;

      return {
        ...state,
        data
      };
    }

    case AccountingActionTypes.UPDATE_RECORD_ERROR: {
      console.log('UPDATE_RECORD_ERROR action being hadled');
      const error = action.payload;
      return {
        ...state,
        error
      };
    }

    case AccountingActionTypes.DELETE_RECORD: {
      console.log('DELETE_RECORD action being hadled');
      return { ...state };
    }

    case AccountingActionTypes.DELETE_RECORD_SUCCESS: {
      console.log('DELETE_RECORD_SUCCESS action being hadled');
      const record = { ...(<Record>action.payload) };
      const data = state.data.filter(r => r._id !== record._id);

      return {
        ...state,
        data
      };
    }

    case AccountingActionTypes.DELETE_RECORD_ERROR: {
      console.log('DELETE_RECORD_ERROR action being hadled');
      const error = action.payload;
      return {
        ...state,
        error
      };
    }

    default: {
      console.log('UNKNOWN_RECORD action being hadled');
      return state;
    }
  }
}
