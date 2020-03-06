import { Dispatch } from 'redux';
import { isCommandRunningAction } from './loading';

const nativeModule = require('../../native/index.node');

export const SET_QUERY_RESULT = 'SET_QUERY_RESULT';
export const SET_QUERY_ERROR = 'SET_QUERY_ERROR';

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
