import { Dispatch } from 'redux';
import { isCommandRunningAction } from './loading';
import { REDIS_DATATYPE } from '../types';

const nativeModule = require('../../native/index.node');

export const SET_QUERY_RESULT = 'SET_QUERY_RESULT';
export const SET_QUERY_ERROR = 'SET_QUERY_ERROR';

export const GET_QUERY_RESULT_FOR_KEY_REQUEST =
  'GET_QUERY_RESULT_FOR_KEY_REQUEST';
export const GET_QUERY_RESULT_FOR_KEY_ERROR = 'GET_QUERY_RESULT_FOR_KEY_ERROR';
export const GET_QUERY_RESULT_FOR_KEY_SUCCESS =
  'GET_QUERY_RESULT_FOR_KEY_SUCCESS';

export const getAllKeyValuesAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: SET_QUERY_ERROR, payload: null });
  dispatch({ type: SET_QUERY_RESULT, payload: null });
  dispatch(isCommandRunningAction(true));

  try {
    const result = await nativeModule.getAllKeyValues();
    dispatch({ type: SET_QUERY_RESULT, payload: JSON.parse(result) });
  } catch (err) {
    dispatch({ type: SET_QUERY_ERROR, payload: err.toString() });
  } finally {
    dispatch(isCommandRunningAction(false));
  }
};

export const getQueryResultAction = (cmd: string) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: SET_QUERY_ERROR, payload: null });
  dispatch({ type: SET_QUERY_RESULT, payload: null });
  dispatch(isCommandRunningAction(true));

  try {
    const result = await nativeModule.getQueryResult(cmd);
    dispatch({ type: SET_QUERY_RESULT, payload: result });
  } catch (err) {
    dispatch({ type: SET_QUERY_ERROR, payload: err.toString() });
  } finally {
    dispatch(isCommandRunningAction(false));
  }
};

export const getValForKeyAction = (key: string, type: string) => (
  dispatch: Dispatch
) => {
  dispatch({ type: GET_QUERY_RESULT_FOR_KEY_REQUEST });
  dispatch({ type: GET_QUERY_RESULT_FOR_KEY_ERROR, payload: null });
  try {
    const res = nativeModule.getValForKey(key, type);
    const result = JSON.parse(res);

    const keys = Object.keys(result);

    if (
      keys.length &&
      result[keys[0]].value &&
      typeof result[keys[0]].value === REDIS_DATATYPE.STRING
    ) {
      result[keys[0]].value = JSON.parse(result[keys[0]].value);
    }

    dispatch({ type: GET_QUERY_RESULT_FOR_KEY_SUCCESS, payload: result });
  } catch (err) {
    console.log('err == ', err.toString());
    dispatch({ type: GET_QUERY_RESULT_FOR_KEY_ERROR, payload: err.toString() });
  }
};
