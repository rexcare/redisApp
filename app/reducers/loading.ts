import { AnyAction } from 'redux';
import {
  SET_COMMAND_RUNNING,
  SET_CONNECTING_TO_REDIS_SERVER
} from '../actions/loading';
import { LoadingState } from './types';

const INITIAL_STATE: LoadingState = {
  isConnectingToServer: false,
  isRunningCmd: false
};

export default function loading(
  state: LoadingState = INITIAL_STATE,
  action: AnyAction
): LoadingState {
  const { type, payload } = action;
  switch (type) {
    case SET_CONNECTING_TO_REDIS_SERVER:
      return { ...state, isConnectingToServer: payload };

    case SET_COMMAND_RUNNING:
      return { ...state, isRunningCmd: payload };

    default:
      return state;
  }
}
