import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import MainPage from './containers/MainPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={MainPage} />
      </Switch>
    </App>
  );
}
