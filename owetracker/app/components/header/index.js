import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      headerComponentSize: {}
    };
  }
  
  render() {
    const { title } = this.props;
    const { headerComponentSize } = this.state;

    return (
      <View style={[styles.header_component_wrapper]} onLayout={(e)=>{
        this.setState({
          headerComponentSize: e.nativeEvent.layout
        });
      }}>
        {
          Object.keys(headerComponentSize).length > 0 ?
            (
              <Text style={[styles.header_title, {fontSize: headerComponentSize.height * .25}]}>{`${title}`}</Text>
            )
          :
          null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header_component_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05487f'
  },
  header_title: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
