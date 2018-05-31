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

function CallbackFunction(callback) {
  let x = 20;
  callback(x);
  CallbackFunction(callback);
}

function PromiseFunction() {
  return new Promise((resolve)=>{
    try {
      resolve(20);
    } catch(e) {
      throw new Error(e);
    }
  });
}

const varPromiseFn = new Promise((resolve, reject) => {
  resolve(42);
});

class RxJSTest extends React.Component {
  insideFunction() {
    return new Promise((resolve) => {
      resolve('this is an inside class promise function');
    });
  }

  insideCallback(callback) {
    callback('This is inside class classback');
    insideCallback(callback);
  }

  componentWillMount() {
    /** GET VALUE FROM A CALLBACK **/
    const getTestCallback = RxJS.Observable.bindCallback(CallbackFunction);
    getTestCallback().subscribe(value => {
      console.log('From a callback function: ',value);
    });

    /** GET VALUE FROM A DIRECT RESOLVE PROMISE FUNCTION **/
    RxJS.Observable.combineLatest(Promise.resolve(5)).subscribe(value => {
      console.log('From a direct resolve promise function: ',value);
    });

    /** GET VALUE FROM A PROMISE VARIBLE FUNCTION **/
    const getTestPromiseFromVariable = RxJS.Observable.fromPromise(varPromiseFn);
    getTestPromiseFromVariable.subscribe((value)=>{
      console.log('From a promise based variable', value);
    }, (error)=>{
      console.log('From a promise based variable', error);
    });

    /** GET VALUE FROM A PROMISE BASED FUNCTION **/
    const getTestPromise = RxJS.Observable.fromPromise(PromiseFunction());
    getTestPromise.subscribe((value)=>{
      console.log('From a promise function', value);
    });

    /** GET VALUE FROM AN INSIDE CLASS PROMISE BASED FUNCTION **/
    const getTestInsideClassPromise = RxJS.Observable.fromPromise(this.insideFunction());
    getTestInsideClassPromise.subscribe((value)=>{
      console.log(value);
    });

    /** GET VALUE FROM AN INSIDE CLASS CALLBACK **/
    const getTestInsideClassCallback = RxJS.Observable.bindCallback(this.insideCallback);
    getTestInsideClassCallback().subscribe(value => {
      console.log(value);
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>RX JS Test Sample</Text>
        <Text>This component is a test on how to handle: </Text>
        <Text>- Pure callback func</Text>
        <Text>- Direct resolve promise func</Text>
        <Text>- Promise func being passed to a variable</Text>
        <Text>- Pure Promise func</Text>
        <Text>in RxJS Observable and Subscribe</Text>
      </View>
    );
  }
}

RxJSTest.propTypes = {
  actions: PropTypes.object.isRequired,
  rxData: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    rxData: state.RxData.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RxJSTest);
