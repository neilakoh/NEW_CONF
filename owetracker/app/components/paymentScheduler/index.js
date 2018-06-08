import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import DeepEqual from 'deep-equal';

import MultiButton from "../multi_button/index";

const { width } = Dimensions.get('window');
const repeatTypes = [
  {id: 'daily', label: "Daily", default: false},
  {id: 'weekly', label: "Weekly", default: false},
  {id: 'monthly', label: "Monthly", default: true},
  {id: 'quarterly', label: "Quarterly", default: false},
  {id: 'yearly', label: "Yearly", default: false}
];

class PaymentScheduler extends React.Component {
  constructor() {
    super();

    this.state = {
      paymentSchedulerWrapperSize: {},
      paymentSchedulerModalWrapperSize: {},
      openPicker: false,
      selectedRepeat: '',
      from: {},
      to: {}
    }
  }

  getRepeat(repeats) {
    const { selectedRepeat } = this.state;
    let getDefault = [];
    if(selectedRepeat !== '') {
      return selectedRepeat;
    } else {
      for(let i=0; i<repeats.length; i++) {
        if(repeats[i].default) {
          getDefault.push(repeats[i].id);
        }
      }

      return getDefault[0];
    }
  }

  getMonthName(val) {
    if(val === 1) {
      return "January";
    }
    if(val === 2) {
      return "February"
    }
    if(val === 3) {
      return "March";
    }
    if(val === 4) {
      return "April";
    }
    if(val === 5) {
      return "May";
    }
    if(val === 6) {
      return "June";
    }
    if(val === 7) {
      return "July";
    }
    if(val === 8) {
      return "August";
    }
    if(val === 9) {
      return "September";
    }
    if(val === 10) {
      return "October";
    }
    if(val === 11) {
      return "November";
    }
    if(val === 12) {
      return "December";
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(DeepEqual(nextProps, this.props) && DeepEqual(nextState, this.state)) {
      return false;
    } else {
      return true;
    }
  }

  widgetBox(paymentSchedulerWrapperSize, title, description) {
    const { from, to } = this.state;
    let currentDate = {};
    currentDate[moment(new Date).format("YYYY-MM-DD")] = {selected: true, selectedColor: '#05487f'};

    if(title === 'FROM') {
      currentDate[from.dateString] = {selected: true, selectedColor: '#8a913e'};
    } else {
      currentDate[to.dateString] = {selected: true, selectedColor: '#91543d'};
    }

    return (
      <View>
        <View style={{width: width, height: paymentSchedulerWrapperSize.height * .70, backgroundColor: '#05487f', justifyContent: 'center', paddingLeft: 10}}>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>{`${title} \t`}<Text style={{fontSize: 10}}>{`(${description})`}</Text></Text>
        </View>
        <Calendar
          current={new Date()}
          hideExtraDays={true}
          markedDates={currentDate}
          onDayPress={(day)=>{
            if(title === 'FROM') {
              this.setState({from: day});
            }
            if(title === 'TO') {
              this.setState({to: day});
            }
          }}
        />
      </View>
    );
  }

  repeat(paymentSchedulerWrapperSize) {
    const { selectedRepeat } = this.state;

    return (
      <View style={{
        width: width,
        height: paymentSchedulerWrapperSize.height * .80,
        backgroundColor: '#05487f',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}>
      {
        repeatTypes.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.repeatStyle, {backgroundColor: selectedRepeat !== '' ? selectedRepeat === item.id ? '#1ea5ff' : null : item.default ? '#1ea5ff' : null}]} onPress={()=>{
            this.setState({selectedRepeat: item.id});
          }}>
            <View>
              <Text style={{color: '#ffffff'}}>{`${item.label}`}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
      </View>
    );
  }

  validateSchedule(obj) {
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    if(Object.keys(obj.from).length < 1 || Object.keys(obj.to).length < 1) {
      return {
        error: 'FROM and TO dates must not be empty.'
      };
    }

    if(new Date(obj.from.dateString) >= currentDate) {
      if(new Date(obj.to.dateString) >= currentDate && new Date(obj.to.dateString) >= new Date(obj.from.dateString)) {
        return obj;
      } else {
        return {
          error: 'TO date must be greater than equal to FROM date.'
        }
      }
    } else {
      return {
        error: 'FROM date must be greater than equal to CURRENT date.'
      }
    }
  }

  render() {
    const { open, whenDone } = this.props;
    const { paymentSchedulerWrapperSize, openPicker, paymentSchedulerModalWrapperSize, from, to } = this.state;
    let fromDescription = Object.keys(from).length > 0 ? `${this.getMonthName(from.month)} ${from.day}, ${from.year}` : 'Select starting date';
    let toDescription = Object.keys(from).length > 0 ? `${this.getMonthName(to.month)} ${to.day}, ${to.year}` : 'Select end date';
    let moduleText = Object.keys(from).length > 0 && Object.keys(from).length > 0 ? (<Text><Text style={{fontWeight: 'bold', color: 'red'}}>FROM:</Text> {from.dateString} {`\n`}<Text style={{fontWeight: 'bold', color: 'red'}}>TO:</Text> {to.dateString} {`\n`}<Text style={{fontWeight: 'bold'}}>{this.getRepeat(repeatTypes).toUpperCase()}</Text></Text>) : 'Select payment schedule';

    return (
      <View style={styles.payment_scheduler_wrapper} onLayout={(e)=>{
        this.setState({paymentSchedulerWrapperSize: e.nativeEvent.layout});
      }}>
      {
        Object.keys(paymentSchedulerWrapperSize).length > 0 ?
        (
          <View>
            <TouchableOpacity onPress={()=>this.setState({openPicker: true})}>
              <View>
                <Text style={{fontSize: 12}}>{moduleText}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
        :
        null
      }
        <Modal
          animationType="slide"
          transparent={false}
          visible={openPicker}
          onRequestClose={() => {}}
        >
        {
          this.repeat(paymentSchedulerWrapperSize)
        }
        <View style={{flex: 1, width: width}} onLayout={(e)=>{
          this.setState({paymentSchedulerModalWrapperSize: e.nativeEvent.layout});
        }}>
          {
            Object.keys(paymentSchedulerModalWrapperSize).length > 0 ?
            (
              <View style={{flex: 1, width: width}}>
                <ScrollView>
                {
                  this.widgetBox(paymentSchedulerWrapperSize, 'FROM', fromDescription)
                }
                {
                  this.widgetBox(paymentSchedulerWrapperSize, 'TO', toDescription)
                }
                </ScrollView>
                <MultiButton
                  height={paymentSchedulerModalWrapperSize.height * .08}
                  buttons={
                    [
                      {
                        name: "cancel",
                        title: "Cancel",
                        backgroundColor: "#05487f",
                        action: ()=>this.setState({
                          paymentSchedulerModalWrapperSize: {},
                          openPicker: false,
                          selectedRepeat: '',
                          from: {},
                          to: {}
                        })
                      },
                      {
                        name: "done",
                        title: "Done",
                        backgroundColor: "#05487f",
                        action: ()=>{
                          const { error } = this.validateSchedule({from: from, to: to, repeat: this.getRepeat(repeatTypes)});
                          if(error) {
                            Alert.alert(
                              'Failed',
                              error,
                              [
                                {text: 'OK', onPress: ()=>{}}
                              ]
                            );
                          } else {
                            whenDone( this.validateSchedule({from: from, to: to, repeat: this.getRepeat(repeatTypes)}) );
                            this.setState({openPicker: false})
                          }
                        }
                      }
                    ]
                  }
                />
              </View>
            )
            :
            null
          }
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  payment_scheduler_wrapper: {
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  repeatStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

PaymentScheduler.propTypes = {
  whenDone: PropTypes.func
};

export default PaymentScheduler;
