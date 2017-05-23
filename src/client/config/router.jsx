
import React from 'react';
import { Route } from 'react-router-dom';

// react containers
import Root from '../components/Root/index';
import Navigation from '../components/Navigation/NavigationComponent';

import asyncComponent from '../components/AsyncComponent/AsyncComponent';

const routes = () => (
  <Root>
    <Route path="/" component={Navigation} />
    <Route
      exact
      path="/"
      component={asyncComponent(System.import('../containers/Home/HomeContainer'))}
    />
  </Root>
);

export default routes;
