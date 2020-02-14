import { combineReducers } from 'redux';
import counter from './counter';
import connection from './connection';
import queryResult from './queryResult';
import { appState } from './types';

export default function createRootReducer() {
  return combineReducers<appState>({
    connectionState: connection,
    queryResultState: queryResult
  });
}
