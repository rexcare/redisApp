import { RedisConnection } from '../types';

export const SET_ACTIVE_CONNECTION = 'SET_ACTIVE_CONNECTION';

export const setActiveConnection = (connection: RedisConnection) => {
  return {
    type: SET_ACTIVE_CONNECTION,
    payload: connection
  };
};
