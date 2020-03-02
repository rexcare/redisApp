import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { RedisConnection } from '../types';

export type ConnectionState = {
  connections: Array<RedisConnection>;
  activeConnection: RedisConnection | undefined;
};

export type LocalDBState = {
  initStatus: boolean;
};

export type QueryResultState = {
  resultData: any | undefined;
};

export type LoadingState = {
  isConnectingToServer: boolean;
  isRunningCmd: boolean;
};

export type AppState = {
  connectionState: ConnectionState;
  queryResultState: QueryResultState;
  localDBState: LocalDBState;
  loadingState: LoadingState;
};

export type ActionType = {
  type: string;
  payload: any;
};

export type Dispatch = ReduxDispatch<Action<ActionType>>;

export type Store = ReduxStore<AppState, ActionType>;
