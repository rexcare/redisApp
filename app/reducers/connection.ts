import { AnyAction } from 'redux';
import { SET_ACTIVE_CONNECTION } from '../actions/connection';
import { ConnectionState } from './types';

const INITIAL_STATE: ConnectionState = {
  activeConnection: undefined,
  connections: []
};

export default function counter(
  state: State = INITIAL_STATE,
  action: AnyAction
): State {
  const { type, payload } = action;

  switch (type) {
    case SET_ACTIVE_CONNECTION:
      return { ...state, activeConnection: payload };

    default:
      return state;
  }
}
