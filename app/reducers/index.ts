import { combineReducers } from 'redux';
import { AppState } from './types';
import connection from './connection';
import query from './query';
import localDB from './localDB';
import loading from './loading';

export default function createRootReducer() {
  return combineReducers<AppState>({
    connectionState: connection,
    queryState: query,
    localDBState: localDB,
    loadingState: loading
  });
}
