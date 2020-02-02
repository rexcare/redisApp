import { AnyAction } from 'redux';
import { RedisConnection } from '../types';
import { SET_ACTIVE_CONNECTION } from '../actions/connection';

interface State {
  activeConnection: RedisConnection;
}

const INITIAL_STATE: State = {
  activeConnection: null
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
