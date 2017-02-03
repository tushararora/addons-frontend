import React from 'react';
import { Router, Route } from 'react-router';

import NotFound from 'core/components/ErrorPage/NotFound';

import App from './containers/App';
import DiscoPane from './containers/DiscoPane';

export default (
  <Router component={App}>
    <Route
      path="/:lang/firefox/discovery/pane/:version/:platform/:compatibilityMode"
      component={DiscoPane}
    />
    <Route path="*" component={NotFound} />
  </Router>
);
