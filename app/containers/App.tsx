import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { Store } from '../reducers/types';
import MainScreen from './main-screen';

type Props = {
  store: Store;
};

const App = ({ store }: Props) => (
  <Provider store={store}>
    <MainScreen />
  </Provider>
);

export default hot(App);
