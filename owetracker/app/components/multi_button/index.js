import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class MultiButton extends React.Component {
  render() {
    const { buttons, height } = this.props;

    return (
      <View style={[styles.multi_button_wrapper, {height: height}]}>
      {
        buttons.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={
              [
                styles.btnStyle,
                {
                  height: height,
                  marginRight: index === buttons.length ? 1.5 : 0,
                  marginLeft: index === 0 ? 0 : 1.5,
                  backgroundColor: item.backgroundColor
                }
              ]
            }
            onPress={()=>{
              item.action()
            }}
          >
            <View>
              <Text style={{color: '#ffffff', fontWeight: 'bold'}}>{`${item.title}`}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  multi_button_wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  btnStyle: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

MultiButton.propTypes = {
  buttons: PropTypes.array,
  height: PropTypes.number,
};

export default MultiButton;
