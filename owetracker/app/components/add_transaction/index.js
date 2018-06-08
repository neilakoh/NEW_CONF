import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Header from "../header/index";
import MultiButton from "../multi_button/index";
import FormInput from "../form_inputs/index";
import FormComponentData from './form_components.json';

class AddTransaction extends React.Component {
  constructor() {
    super();
    this.state = {
      formWrapperSize: {}
    };
  }
  render() {
    const { open, mobileScreenSize, onClose, onSave } = this.props;
    const { formWrapperSize } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        onRequestClose={() => {

        }}
      >

        <View style={[styles.add_transaction_wrapper, {width: mobileScreenSize.width}]}>
          <View style={[styles.header, {width: mobileScreenSize.width, height: mobileScreenSize.height * .085}]}>
            <Header
              title={"Add Transaction"}
            />
          </View>
          <ScrollView style={{flex: 1, width: mobileScreenSize.width}} onLayout={(e)=>{
            this.setState({formWrapperSize: e.nativeEvent.layout})
          }}>
            {
              Object.keys(formWrapperSize).length > 0 ?
              (
                <FormInput
                  ref={(inFrm) => { this.InputForm = inFrm; }}
                  inputs={FormComponentData}
                  formWrapperSize={formWrapperSize}
                />
              )
              :
              (
                <ActivityIndicator size="large" color="#0000ff" />
              )
            }
          </ScrollView>
        </View>

        <MultiButton
          height={mobileScreenSize.height * .09}
          buttons={
            [
              {
                name: "cancel",
                title: "Cancel",
                backgroundColor: "#05487f",
                action: ()=>{onClose()}
              },
              {
                name: "save",
                title: "Save",
                backgroundColor: "#05487f",
                action: ()=>{onSave(this.InputForm.state)}
              }
            ]
          }
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  add_transaction_wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

AddTransaction.propTypes = {
  open: PropTypes.bool.isRequired,
  mobileScreenSize: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};

export default AddTransaction;
