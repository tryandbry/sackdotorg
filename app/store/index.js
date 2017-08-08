import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import control from './reducer-control';
const reducer = combineReducers({
  control,
});

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(createLogger,thunkMiddleware)
  )
);
