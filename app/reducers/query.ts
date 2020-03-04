import { QueryState } from './types';
import { SET_QUERY_ERROR, SET_QUERY_RESULT } from '../actions/query';

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

    default:
      return state;
  }
}
