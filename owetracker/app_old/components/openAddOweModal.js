import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, Switch, ScrollView, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
import DeepEqual from 'deep-equal';
import * as Animatable from 'react-native-animatable';

import {bindActionCreators} from 'redux';
import * as appActions from '../actions/index';
import { connect } from 'react-redux';

import { checkEmptyRequiredTextInput, generateId } from '../modules/index.js';

const asCreditorForm = [
  {
    placeholder: "Enter Debtor's Name",
    id: "name",
    keyboard: "default",
    editable: true,
    type: "text",
    required: true,
    maxLength: 15
  },
  {
    placeholder: "Enter the borrowed amount.",
    id: "amount",
    keyboard: "numeric",
    editable: true,
    type: "number",
    required: true,
    maxLength: 1000
  },
  {
    placeholder: "Description",
    id: "description",
    keyboard: "default",
    editable: true,
    type: "text",
    required: false,
    maxLength: 200
  },
  {
    placeholder: "Contact Info",
    id: "contact",
    keyboard: "default",
    editable: true,
    type: "text",
    required: false,
    maxLength: 200
  },
  {
    placeholder: "Add Due Date",
    id: "due",
    keyboard: "",
    editable: false,
    type: "date",
    required: false,
    maxLength: null
  }
];

const asDebtorForm = [
  {
    placeholder: "Enter Creditor's Name",
    id: "name",
    keyboard: "default",
    editable: true,
    type: "text",
    required: true,
    maxLength: 15
  },
  {
    placeholder: "Enter the borrowed amount.",
    id: "amount",
    keyboard: "numeric",
    editable: true,
    type: "number",
    required: true,
    maxLength: 1000
  },
  {
    placeholder: "Description",
    id: "description",
    keyboard: "default",
    editable: true,
    type: "text",
    required: false,
    maxLength: 200
  },
  {
    placeholder: "Contact Info",
    id: "contact",
    keyboard: "default",
    editable: true,
    type: "text",
    required: false,
    maxLength: 200
  },
  {
    placeholder: "Add Due Date",
    id: "due",
    keyboard: "",
    editable: false,
    type: "date",
    required: false,
    maxLength: null
  }
];

class OpenAddOweModal extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      amount: null,
      description: "",
      contact: "",
      selectedDueDate: null,
      rawSelectedDueDate: null,
      security: {
        isProtected: false,
        pin: null
      },
      openPinInput: false,
      keyboardState: null,
      fieldPositions: {}
    };

    this.save = this.save.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(DeepEqual(nextProps, this.props) && DeepEqual(nextState, this.state)) {
      return false;
    } else {
      return true;
    }
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {this.setState({keyboardState: e})});
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
  }

  resetState() {
    this.setState({
      name: "",
      amount: null,
      description: "",
      contact: "",
      selectedDueDate: null,
      rawSelectedDueDate: null,
      security: {
        isProtected: false,
        pin: null
      },
      openPinInput: false,
      keyboardState: null,
      fieldPositions: {}
    });
  }

  launchPinInput(openPinInput, screenSize) {
    let getOffsetSize = screenSize.width - screenSize.height;
    if(openPinInput) {
      return (
        <Animatable.View
          animation="bounceIn"
          direction="normal"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: screenSize.width,
            height: screenSize.height,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2
          }}
        >
          <KeyboardAvoidingView behavior={'position'} style={{alignItems: 'center'}} keyboardVerticalOffset={getOffsetSize}>
            <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
              <View style={{
                width: screenSize.width * .85,
                height: screenSize.height * .25,
                backgroundColor: '#ffffff',
                borderRadius: 10
              }} ref='pin-comp-wrapper'>

                <View ref='pin-comp-header' style={{
                  width: screenSize.width * .85,
                  height: (screenSize.height * .25) * .30,
                  backgroundColor: '#006793',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10
                }}>
                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingLeft: 15
                  }}>
                    <Text style={{fontWeight: 'bold', color: '#ffffff', fontSize: ((screenSize.height * .25) * .30) * .50}}>Enter Pin</Text>
                  </View>
                  <TouchableOpacity style={{
                    width: (screenSize.width * .85) * .20,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }} onPress={()=>{
                    this.setState({
                      security: {
                        isProtected: this.refs.pin._lastNativeText ? true : false,
                        pin: this.refs.pin._lastNativeText ? this.refs.pin._lastNativeText : null
                      },
                      openPinInput: false
                    });
                  }}>
                    <View>
                      <Icon name="times-circle" size={(screenSize.width * .15) * .60} color="#ffffff" />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <TextInput
                    ref='pin'
                    placeholder='Pin'
                    secureTextEntry={true}
                    keyboardType='numeric'
                    returnKeyType='done'
                    underlineColorAndroid={'transparent'}
                    maxLength={12}
                    style={{
                      width: (screenSize.width * .85) * .90,
                      height: (screenSize.height * .25) * .30,
                      borderRadius: 5,
                      textAlign: 'center',
                      fontSize: ((screenSize.height * .25) * .30) * .50,
                      borderColor: '#cccccc',
                      borderStyle: 'solid',
                      borderWidth: 1
                    }}
                    onSubmitEditing={()=>{
                      this.setState({
                        security: {
                          isProtected: this.refs.pin._lastNativeText ? true : false,
                          pin: this.refs.pin._lastNativeText ? this.refs.pin._lastNativeText : null
                        },
                        openPinInput: false
                      });
                    }}
                  />
                </View>

              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animatable.View>
      )
    } else {
      return null;
    }
  }

  save() {
    const {
      name,
      amount,
      description,
      contact,
      selectedDueDate,
      rawSelectedDueDate,
      security
    } = this.state;
    const {
      owedToMeList,
      owedByMeList,
      idCollection,
      actions,
      selectedTab
    } = this.props;

    // FIRST PARAM IS THE STATES, SECOND PARAM ARE THE REQUIRED FIELDS
    checkEmptyRequiredTextInput(this.state, ["name", "amount"]).then((res)=>{
      if(res.success && res.data.length < 1) {
        let id = generateId();
        let newOwedToMeList = {...owedToMeList};
        let newOwedByMeList = {...owedByMeList}
        let newIdArrayCopy = [...idCollection];

        newIdArrayCopy.push(id);

        if(selectedTab === "owedToMe") {
          newOwedToMeList[id] = {
            _id: id,
            name: name,
            amount: amount,
            balance:  amount,
            totalPaidAmount: 0,
            paymentHistory: {},
            description: description,
            contact: contact,
            selectedDueDate: selectedDueDate,
            rawSelectedDueDate: rawSelectedDueDate,
            security,
            inProgress: true,
            transactionType: selectedTab
          };
          actions.OwedToMeList(newOwedToMeList);
          actions.IDCollection(newIdArrayCopy);
          actions.OpenAddOweModal(false);
          this.resetState();
        }
        if(selectedTab === "owedByMe") {
          newOwedByMeList[id] = {
            _id: id,
            name: name,
            amount: amount,
            balance:  amount,
            totalPaidAmount: 0,
            paymentHistory: {},
            description: description,
            contact: contact,
            selectedDueDate: selectedDueDate,
            rawSelectedDueDate: rawSelectedDueDate,
            security,
            inProgress: true,
            transactionType: selectedTab
          };
          actions.OwedByMeList(newOwedByMeList);
          actions.IDCollection(newIdArrayCopy);
          actions.OpenAddOweModal(false);
          this.resetState();
        }

      } else {
        console.log('has error');
      }
    });

  }

  OMHeader(screenSize, actions, selectedTab) {
    return (
      <View style={{
        width: screenSize.width,
        height: screenSize.height * .10,
        backgroundColor: '#006793',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 2
      }}>

        <TouchableOpacity style={{
          width: screenSize.width * .15,
          justifyContent: 'center',
          alignItems: 'center',
        }} onPress={()=>{
          actions.OpenAddOweModal(false);
          this.resetState();
        }}>
          <Icon name="chevron-circle-left" size={(screenSize.width * .15) * .75} color="#ffffff" />
        </TouchableOpacity>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#ffffff'}}>{selectedTab === 'owedToMe' ? 'AS A LENDER' : 'AS A BORROWER' }</Text>
        </View>

        <TouchableOpacity style={{
          width: screenSize.width * .15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/** SOME ICON AND EVENT HERE **/}
        </TouchableOpacity>

      </View>
    );
  }

  OMBody(screenSize, selectedTab, actions, selectedFormField, selectedDueDate, isScrollForm, scrollTo) {
    let getVerficalOffset = screenSize.width - screenSize.height;
    let staticVal = screenSize.height - (screenSize.height * 2);

    console.log(isScrollForm)
    return (
      <View style={{
        width: screenSize.width,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <KeyboardAvoidingView behavior={'position'} style={{alignItems: 'center'}} keyboardVerticalOffset={isScrollForm ? scrollTo : staticVal}>
          <ScrollView>
            {
              this.OMForm(screenSize, selectedTab, actions, selectedFormField, selectedDueDate)
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  OMForm(screenSize, selectedTab, actions, selectedFormField, selectedDueDate) {
    let form = selectedTab === 'owedToMe' ? asCreditorForm : asDebtorForm;
    let obj = {};

    return (
      <View style={{
        width: screenSize.width * .85,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        
      <View style={{
        flex: 1,
        width: screenSize.width * .85,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        {
          form.map((item, index)=>(
            <View key={index} onLayout={(e)=>{

              if(item.keyboard !== '') {
                obj[item.id] = {y: e.nativeEvent.layout.y};
                this.fieldLocation = obj;
              }

            }}>
              {
                item.type !== 'date' ?
                  (<TextInput
                    ref={item.id}
                    placeholder={item.required ? `${item.placeholder} (required)` : `${item.placeholder}`}
                    editable={item.editable}
                    keyboardType={item.keyboard}
                    maxLength={item.maxLength}
                    returnKeyType={item.keyboard === 'numeric' ? 'done' : 'next'}
                    style={{
                      width: screenSize.width * .85,
                      paddingTop: 15,
                      paddingBottom: 5,
                      marginTop: 10,
                      borderStyle: 'solid',
                      borderColor: selectedFormField === item.id ? '#006793' : '#bcbcbc',
                      borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
                      fontSize: 15
                    }}
                    onChangeText={(input) => {
                      this.state[item.id] = input;
                      this.setState(this.state);
                    }}
                    onFocus={()=>{
                      this.setState({fieldPositions: this.fieldLocation[item.id]});
                      actions.AddOweForm(item.id);
                    }}
                    onBlur={()=>{
                      actions.AddOweForm("");
                    }}
                    onSubmitEditing={()=>{
                      let getNextInput = index + 1;
                      let getKeyboardType = form[getNextInput]['keyboard']
                      if(getKeyboardType !== '') {
                        let getNextId = form[getNextInput]['id'];
                        this.refs[getNextId].focus();
                      } else {
                        Keyboard.dismiss();
                      }
                    }}
                  />)
                :
                (
                  <TouchableOpacity
                    onPress={()=>{
                      this.refs.dobDialog.open({
                        date: new Date(),
                        minDate: new Date()
                      });
                    }}
                    style={{
                      // backgroundColor: 'red',
                      width: screenSize.width * .85,
                      paddingTop: 15,
                      paddingBottom: 5,
                      marginTop: 10,
                      borderStyle: 'solid',
                      borderColor: selectedFormField === item.id ? '#006793' : '#bcbcbc',
                      borderBottomWidth: 2,
                    }}
                  >
                    <View>
                      <Text style={{fontSize: 15, color: selectedDueDate !== null ? '#000000' : '#d8d8d8'}}>
                        {selectedDueDate !== null ? selectedDueDate.toString() : "Select due date (MM/DD/YYYY)"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              }
            </View>
          ))
        }

        <View style={{
          margin: 20,
          width: screenSize.width * .85,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            <Text style={{fontSize: 15}}>Enable Protection</Text>
          </View>

          <View style={{
            flex: 1
          }}>
            <Switch
              value={this.state.security.isProtected}
              onValueChange={(val)=>{
                this.setState({
                  security: {
                    isProtected: val,
                    pin: null
                  },
                  openPinInput: val
                });
              }}
            />
          </View>
        </View>
        
      </View>

      <View>
        <TouchableOpacity style={{
            width: screenSize.width,
            backgroundColor: '#006793',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            padding: 15,
          }} activeOpacity={0.65} onPress={this.save}>
            <View>
              <Text style={{
                color: '#ffffff',
                fontWeight: 'bold'
              }}>Save</Text>
            </View>
          </TouchableOpacity>
      </View>

        <DatePickerDialog ref="dobDialog" onDatePicked={(date)=>{
          this.setState({
            selectedDueDate: moment(date).format('LL'),
            rawSelectedDueDate: date
          });
        }}/>
      </View>
    );
  }

  getKeyboardAndFieldDiff(screenSize, keyboardState, fieldPositions) {
    return screenSize.height - (keyboardState.endCoordinates.screenY + fieldPositions.y);
  }

  render() {
    const {
      actions,
      openAddOweModal,
      selectedTab,
      selectedFormField,
      screenSize,
    } = this.props;
    const {
      selectedDueDate,
      openPinInput,
      keyboardState,
      fieldPositions
    } = this.state;
    let isScrollForm = keyboardState ? this.getKeyboardAndFieldDiff(screenSize, keyboardState, fieldPositions) < fieldPositions.y ? true : false : false;
    let scrollTo = keyboardState ? (this.getKeyboardAndFieldDiff(screenSize, keyboardState, fieldPositions) - (this.getKeyboardAndFieldDiff(screenSize, keyboardState, fieldPositions) * 2)) - 60 : screenSize.height;
    return (
      <Modal
        visible={openAddOweModal}
        animationType={'slide'}
        onRequestClose={() => {
          actions.OpenAddOweModal(false);
        }}
      >
        {
          this.OMHeader(screenSize, actions, selectedTab)
        }
        {
          this.OMBody(screenSize, selectedTab, actions, selectedFormField, selectedDueDate, isScrollForm, scrollTo)
        }
        {
          this.launchPinInput(openPinInput, screenSize)
        }
      </Modal>
    );
  }
}

OpenAddOweModal.propTypes = {
  actions: PropTypes.object.isRequired,
  screenSize: PropTypes.object.isRequired,
  openAddOweModal: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  selectedTab: PropTypes.string.isRequired,
  selectedFormField: PropTypes.string.isRequired,
  owedToMeList: PropTypes.object.isRequired,
  owedByMeList: PropTypes.object.isRequired,
  idCollection: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    screenSize: ownProps.screenSize,
    openAddOweModal: ownProps.openAddOweModal,
    selectedTab: ownProps.selectedTab,
    selectedFormField: ownProps.selectedFormField,
    owedToMeList: state.OwedToMeList.list,
    owedByMeList: state.OwedByMeList.list,
    idCollection: state.IDCollection.ids,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenAddOweModal);
