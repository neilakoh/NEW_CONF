import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {bindActionCreators} from 'redux';
import * as appActions from './actions/index';
import { connect } from 'react-redux';
import DeepEqual from 'deep-equal';
import RNFS from 'react-native-fs';

import MainComponent from './components/main/index';

RNFS.mkdir(RNFS.DocumentDirectoryPath + '/OweTracker').then((result) => {
  console.log(result);
})

const { height, width } = Dimensions.get('window');

class OweTracker extends React.Component {
  constructor() {
    super();

    this.state = {
      mobileScreenSize: {}
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(DeepEqual(nextProps, this.props) && DeepEqual(nextState, this.state)) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { mobileScreenSize } = this.state;

    return(
      <View style={[styles.container]} onLayout={(e)=>{
        this.setState({
          mobileScreenSize: e.nativeEvent.layout
        });
      }}>
      {
        Object.keys(mobileScreenSize).length > 0 ?
          <MainComponent
            mobileScreenSize={mobileScreenSize}
          />
        :
        (<ActivityIndicator size="large" color="#0000ff" />)
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
});

OweTracker.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(OweTracker);
