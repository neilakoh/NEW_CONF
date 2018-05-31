import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import App from '../imports/ui/App.js';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('render-target')
  );
});
