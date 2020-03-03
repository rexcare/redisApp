import { Dispatch } from 'redux';
import { RedisConnection } from '../types';

export const SET_ACTIVE_CONNECTION = 'SET_ACTIVE_CONNECTION';
export const SET_CONNECTIONS = 'SET_CONNECTIONS';

export const setActiveConnectionAction = (connection: RedisConnection) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_ACTIVE_CONNECTION,
    payload: connection
  });
};

export const setConnectionsAction = (connections: RedisConnection[]) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_CONNECTIONS,
    payload: connections
  });
};
