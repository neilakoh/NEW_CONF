import PropTypes from 'prop-types';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {bindActionCreators} from 'redux';
import * as courseAction from '../actions/index';
import { connect } from 'react-redux';
import RxJS from 'rxjs/Rx';

import Conn from '../conn.js';
const app = Conn.client;
const todos = app.service('users');

class FeathersJSRxJS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      text: ''
    }

    this.createTodo = this.createTodo.bind(this);
  }

  componentDidMount() {
    todos.on('created', (res)=>{console.log(res)})
    this.todos = todos.watch({ listStrategy: 'always' }).find({query: {$select: ["_id", "createdAt"], $sort: {createdAt: 1}}}).subscribe(todos => {
      console.log('watch', todos);
    });

    // RxJS.Observable.fromPromise(todos.watch({ listStrategy: 'smart' }).find({query: {$select: ["_id"]}})).subscribe((res)=>{
    //   console.log(res);
    // })
  }

  componentWillUnmount () {
    this.todos.unsubscribe();
  }

  createTodo (ev) {
    todos.create({
      text: this.state.text,
      complete: false
    });
    this.setState({ text: '' });
  }

  render() {
    const { todos, text } = this.state;

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TouchableOpacity onPress={this.createTodo}>
          <View>
            <Text>Update Data</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          console.log('abort');
          this.todos.unsubscribe();
        }}>
          <View>
            <Text>unsubscribe</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

FeathersJSRxJS.propTypes = {
  actions: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    app: ownProps.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeathersJSRxJS);
