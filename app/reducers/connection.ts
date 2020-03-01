import { AnyAction } from 'redux';
import { SET_ACTIVE_CONNECTION, SET_CONNECTIONS } from '../actions/connection';
import { ConnectionState } from './types';

const INITIAL_STATE: ConnectionState = {
  activeConnection: undefined,
  connections: [
    // {
    //   db: '127.0.0.1',
    //   host: 'Local',
    //   name: 'Local',
    //   password: 'pwd',
    //   port: '1234'
    // }
  ]
};

export default function connection(
  state: State = INITIAL_STATE,
  action: AnyAction
): State {
  const { type, payload } = action;

  switch (type) {
    case SET_ACTIVE_CONNECTION:
      return { ...state, activeConnection: payload };

    case SET_CONNECTIONS:
      return { ...state, connections: payload };

    default:
      return state;
  }
}
