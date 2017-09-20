import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './store';

import indexComponent from './component';
import Photo from './component/photo';
import Slate from './component/slate';
import Toolbar from './component/slate/Toolbar';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={indexComponent}>
        <IndexRedirect to="/toolbar" />
        <Route path="/photo" component={Photo} />
        <Route path="/slate" component={Slate} />
        <Route path="/toolbar" component={Toolbar} />
      </Route>
    </Router>
  </Provider>
  ,
  document.getElementById('main')
);


import firebase from './firebase';
