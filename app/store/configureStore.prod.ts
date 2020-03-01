import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';
import { Store, AppState } from '../reducers/types';

const rootReducer = createRootReducer();
const enhancer = applyMiddleware(thunk);

function configureStore(initialState?: AppState): Store {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore };
