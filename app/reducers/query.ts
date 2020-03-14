import { QueryState } from './types';
import {
  SET_QUERY_ERROR,
  SET_QUERY_RESULT,
  GET_QUERY_RESULT_FOR_KEY_SUCCESS
} from '../actions/query';

const INITIAL_STATE: QueryState = {
  resultData: undefined,
  error: undefined
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_QUERY_RESULT:
      return { ...state, resultData: payload };

    case SET_QUERY_ERROR:
      return { ...state, error: payload };

    case GET_QUERY_RESULT_FOR_KEY_SUCCESS:
      return { ...state, resultData: { ...state.resultData, ...payload } };

    default:
      return state;
  }
}
