import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Modal
} from 'react-native';

class DueDatePicker extends React.Component {
  render() {
    const { open } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        onRequestClose={() => {

        }}
      >

      </Modal>
    );
  }
}

DueDatePicker.propTypes = {
  open: PropTypes.bool.isRequired
};

export default DueDatePicker;
