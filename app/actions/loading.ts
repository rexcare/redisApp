import { Dispatch } from 'redux';

export const SET_CONNECTING_TO_REDIS_SERVER = 'SET_CONNECTING_TO_REDIS_SERVER';
export const SET_COMMAND_RUNNING = 'SET_COMMAND_RUNNING';

export const isConnectingToServerAction = (isConnecting: boolean) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_CONNECTING_TO_REDIS_SERVER,
    payload: isConnecting
  });
};

export const isCommandRunningAction = (isRunning: boolean) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_COMMAND_RUNNING,
    payload: isRunning
  });
};
