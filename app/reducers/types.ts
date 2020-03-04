import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { RedisConnection } from '../types';

export type ConnectionState = {
  connections: Array<RedisConnection>;
  activeConnection: RedisConnection | undefined;
};

export type LocalDBState = {
  initStatus: boolean;
};

export type QueryState = {
  resultData: any | undefined;
  error: string | undefined;
};

export type LoadingState = {
  isConnectingToServer: boolean;
  isRunningCmd: boolean;
};

export type AppState = {
  connectionState: ConnectionState;
  queryState: QueryState;
  localDBState: LocalDBState;
  loadingState: LoadingState;
};

export type ActionType = {
  type: string;
  payload: any;
};

export type Dispatch = ReduxDispatch<Action<ActionType>>;

export type Store = ReduxStore<AppState, ActionType>;
