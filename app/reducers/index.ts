import { combineReducers } from 'redux';
// import counter from './counter';
import { AppState } from './types';
import connection from './connection';
import queryResult from './queryResult';
import localDB from './localDB';

export default function createRootReducer() {
  return combineReducers<AppState>({
    connectionState: connection,
    queryResultState: queryResult,
    localDBState: localDB
  });
}
