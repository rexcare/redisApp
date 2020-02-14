import { QueryResultState } from './types';

const INITIAL_STATE: QueryResultState = {
  resultData: undefined
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
