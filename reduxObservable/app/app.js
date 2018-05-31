import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {bindActionCreators} from 'redux';
import * as appActions from './actions/index';
import { connect } from 'react-redux';


const { height, width } = Dimensions.get('window');

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    props.actions.TestAction('ekkir');
  }

  render() {
    return(
      <View>
        
      </View>
    )
  }
}

MainApp.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
