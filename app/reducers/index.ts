import { combineReducers } from 'redux';
import { AppState } from './types';
import connection from './connection';
import queryResult from './queryResult';
import localDB from './localDB';
import loading from './loading';

export default function createRootReducer() {
  return combineReducers<AppState>({
    connectionState: connection,
    queryResultState: queryResult,
    localDBState: localDB,
    loadingState: loading
  });
}
