import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic } from './epics/index.js';

import * as reducers from './reducers';
import MainApp from './app.js';

const epicMiddleware = createEpicMiddleware(rootEpic); 
const reducer = combineReducers(reducers);

const store2 = createStore(
    reducer,
    applyMiddleware(thunk, epicMiddleware)
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store2}>
        <MainApp />
      </Provider>
    );
  }
}
