import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import * as courseAction from '../../client/actions/actions';
import { connect } from 'react-redux';

// App component - represents the whole app
class App extends Component {
  constructor() {
    super();

    this.saveTask = this.saveTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchTasks({_id: "dadrrdmZpRmbH4N8f"});
  }

  saveTask() {
    const { actions } = this.props;
    let data = {
      name: "save this data",
      createdAt: new Date(),
      author: "neil anthony te",
      status: "progress",
    }

    actions.saveTask(data);
  }

  removeTask() {
    const { actions } = this.props;
    let query = {
      _id: "sJDNTcwhDPJfLceQg"
    };
    actions.removeTask(query);
  }

  render() {
    console.log(this.props.removedTaskResult);
    console.log(this.props.savedTaskResult);
    return (
      <div className="container">
        <button type="button" className="btn btn-primary" onClick={this.saveTask} >Save Task</button>
        <button type="button" className="btn btn-primary" onClick={this.removeTask} >Remove Task</button>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  savedTaskResult: PropTypes.object.isRequired,
  removedTaskResult: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    savedTaskResult: state.saveTask,
    removedTaskResult: state.removeTask
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
