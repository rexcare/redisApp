import { Dispatch } from 'redux';
import { RedisConnection } from '../types';

const util = require('util');
const { openConnection: _openConnection } = require('../../native/index.node');

export const SET_ACTIVE_CONNECTION = 'SET_ACTIVE_CONNECTION';
export const SET_CONNECTIONS = 'SET_CONNECTIONS';

export const setActiveConnection = (connection: RedisConnection) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_ACTIVE_CONNECTION,
    payload: connection
  });
};

export const setConnections = (connections: RedisConnection[]) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_CONNECTIONS,
    payload: connections
  });
};

export const openConnection = (connection: RedisConnection) => async (
  dispatch: Dispatch
) => {
  const openConnectionPromise = util.promisify(_openConnection);

  const { name, id, ...requiredFields } = connection;

  try {
    const result = await openConnectionPromise(requiredFields);
  } catch (err) {
    console.log('err === ', err);
  }

  dispatch({ type: 'testing' });
};
