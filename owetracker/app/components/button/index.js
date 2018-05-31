import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class CustomButton extends React.Component {
  render() {
    const { label, bgColor, txtColor, onEvent } = this.props;
    return (
      <TouchableOpacity style={[styles.button_component_wrapper, {backgroundColor: bgColor}]} activeOpacity={0.75} onPress={()=>{
        onEvent();
      }}>
        <View>
          <Text style={[styles.button_text, {color: txtColor}]}>{`${label}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button_component_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05487f'
  },
  button_text: {
    fontWeight: 'bold'
  }
});

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  txtColor: PropTypes.string,
  onEvent: PropTypes.func
};

export default CustomButton;
