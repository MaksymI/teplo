import { AccountingActions, AccountingActionTypes } from './accounting.actions';
import { AccountingState, initialAccountingState } from './accounting.state';


export function recordsReducer(
  state = initialAccountingState,
  action: AccountingActions
): AccountingState {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {
    case AccountingActionTypes.GET_RECORDS: {
      console.log('GET_RECORDS action being hadled');
      return { ...state };
    }

    case AccountingActionTypes.GET_RECORD: {
      console.log('GET_RECORD action being hadled');
      return { ...state };
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

    default:
      return state;
  }
}
