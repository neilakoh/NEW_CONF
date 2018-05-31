import PropTypes from 'prop-types';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {
  RxJSTest,
  FeathersRxJS,
  PersonalityTest
} from './tests/index.js';

import PersonalityTestData from './mocks/personalityTest.json';

import Conn from './conn.js';
const app = Conn.client;

class App extends React.Component {
  constructor() {
    super();
    this.testFn = this.testFn.bind(this);
    this.testFn2 = this.testFn2.bind(this);
  }

  testFn() {
    console.log('this is a test external function');
  }

  testFn2() {
    console.log('this is a test external function 2');
  }

  setEquivalentRating(val) {
    if(val === '1') {
      return 'Disagree';
    }
    if(val === '2') {
      return 'Slightly disagree'
    }
    if(val === '3') {
      return 'Neutral'
    }
    if(val === '4') {
      return 'Slightly agree'
    }
    if(val === '5') {
      return 'Agree'
    }
  }


  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <PersonalityTest
          data={PersonalityTestData}
          lastAnsweredQuestion={8}
          whenDone={[this.testFn, this.testFn2]}
          // changeOptionLabels={this.setEquivalentRating}
          allowSkip={false}
        />
      </View>
    );
  }
}

export default App;
