import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './store';

import indexComponent from './component';
import Photo from './component/photo';
import Slate from './component/slate';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={indexComponent}>
        <IndexRedirect to="/slate" />
        <Route path="/photo" component={Photo} />
        <Route path="/slate" component={Slate} />
      </Route>
    </Router>
  </Provider>
  ,
  document.getElementById('main')
);


import firebase from './firebase';
