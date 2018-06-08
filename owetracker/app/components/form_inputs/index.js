import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TextInput
} from 'react-native';
import ContactInfo from '../contact_info/index';
import PaymentScheduler from '../paymentScheduler';

const acceptableTypes = ['default', 'numeric', 'email-address', 'phone-pad'];

class FormInputs extends React.Component {
  constructor() {
    super();

    this.state = {
      transactionName: '',
      creditorDebtorName: '',
      transactionDescription: '',
      borrowedAmount: 0,
      contactInformation: {},
      paymentSchedule: {}
    }
  }
  render() {
    const { inputs, formWrapperSize } = this.props;

    return (
      <View style={[styles.form_inputs_wrapper, {height: formWrapperSize.height, width: formWrapperSize.width}]}>
        {
          inputs.map((item, index) => (
            acceptableTypes.indexOf(item.type) > -1 ?
            (
              <TextInput
                ref={(text) => { this[item.refName] = text; }}
                key={index}
                style={[styles.inputStyle, {height: formWrapperSize.height * .10, width: formWrapperSize.width * .95}]}
                placeholder={item.placeholder}
                underlineColorAndroid='transparent'
                keyboardType={item.type}
                onChangeText={(text) => {
                  this.state[item.refName] = text;
                  this.setState(this.state);
                }}
              />
            )
            :
            null
          ))
        }
        <View style={{width: formWrapperSize.width * .95, height: formWrapperSize.height * .10, marginTop: 5}}>
          <ContactInfo onSelected={(selected)=>this.setState({contactInformation: selected})}/>
        </View>
        <View style={{width: formWrapperSize.width * .95, height: formWrapperSize.height * .10, marginTop: 5}}>
          <PaymentScheduler whenDone={(info)=>this.setState({paymentSchedule: info})}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form_inputs_wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  inputStyle: {
    marginTop: 5,
    borderColor: '#000000',
    borderBottomWidth: 1.5,
    borderStyle: 'solid'
  }
});

FormInputs.propTypes = {
  inputs: PropTypes.array,
  formWrapperSize: PropTypes.object,
};

export default FormInputs;
