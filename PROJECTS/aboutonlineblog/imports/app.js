import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import * as courseAction from '../client/actions/index.js';
import { connect } from 'react-redux';

import TopMenu from './components/TopMenu.js';
import AppBody from './components/AppBody.js';

class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <div>
          <TopMenu />
        </div>

        <div>
          <AppBody/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
