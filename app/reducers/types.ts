import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { RedisConnection } from '../types';

export type counterStateType = {
  counter: number;
};

export type ConnectionState = {
  connections: Array<RedisConnection>;
  activeConnection: RedisConnection | undefined;
};

export type QueryResultState = {
  resultData: any | undefined;
};

export type AppState = {
  connectionState: ConnectionState;
  queryResultState: QueryResultState;
};

export type GetState = () => counterStateType & connectionStateType;

export type ActionType = {
  type: string;
  payload: any;
};

export type Dispatch = ReduxDispatch<Action<ActionType>>;

export type Store = ReduxStore<counterStateType, Action<string>>;
