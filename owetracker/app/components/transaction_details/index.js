import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Modal
} from 'react-native';

class TransactionDetails extends React.Component {
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

TransactionDetails.propTypes = {
  open: PropTypes.bool.isRequired
};

export default TransactionDetails;
