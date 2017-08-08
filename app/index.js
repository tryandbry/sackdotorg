import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './store';

import indexComponent from './component';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={indexComponent}>
        {/* ADD routes */}
      </Route>
    </Router>
  </Provider>
  ,
  document.getElementById('main')
);
