import { AnyAction } from 'redux';
import { LocalDBState } from './types';
import { SET_LOCALDB_INIT_STATUS } from '../actions/localDB';

const INITIAL_STATE: LocalDBState = {
  initStatus: false
};

export default function localDB(state = INITIAL_STATE, action: AnyAction) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOCALDB_INIT_STATUS:
      return { ...state, initStatus: payload };
    default:
      return state;
  }
}
