import React from 'react';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { Store } from '../reducers/types';
// import Routes from '../Routes';
import MainScreen from './main-screen/MainScreen';

type Props = {
  store: Store;
  history: {};
};

const App = ({ store, history }: Props) => (
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
    <MainScreen />
    {/* </ConnectedRouter> */}
  </Provider>
);

export default hot(App);
