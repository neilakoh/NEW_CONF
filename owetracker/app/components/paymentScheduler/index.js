import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');
const repeatTypes = [
  {id: 'daily', label: "Daily"},
  {id: 'weekly', label: "Weekly"},
  {id: 'monthly', label: "Monthly"},
  {id: 'quarterly', label: "Quarterly"},
  {id: 'yearly', label: "Yearly"}
];

class PaymentScheduler extends React.Component {
  constructor() {
    super();

    this.state = {
      paymentSchedulerWrapperSize: {},
      openPicker: false,
      selectedRepeat: 'monthly'
    }
  }

  widgetBox(paymentSchedulerWrapperSize, title, description) {
    return (
      <View>
        <View style={{width: width, height: paymentSchedulerWrapperSize.height * .70, backgroundColor: '#05487f', justifyContent: 'center', paddingLeft: 10}}>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>{`${title} \t`}<Text style={{fontSize: 10}}>{`(${description})`}</Text></Text>
        </View>
        <Calendar
          current={new Date()}
          hideExtraDays={true}
        />
      </View>
    );
  }

  repeat(paymentSchedulerWrapperSize) {
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
          <TouchableOpacity key={index} style={styles.repeatStyle}>
            <View>
              <Text style={{color: '#ffffff'}}>{`${item.label}`}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
      </View>
    );
  }

  render() {
    const { open } = this.props;
    const { paymentSchedulerWrapperSize, openPicker } = this.state;

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
                <Text>Select payment schedule</Text>
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
          <ScrollView>
          {
            this.repeat(paymentSchedulerWrapperSize)
          }
          {
            this.widgetBox(paymentSchedulerWrapperSize, 'FROM', 'Select starting date')
          }
          {
            this.widgetBox(paymentSchedulerWrapperSize, 'TO', 'Select end date')
          }
          </ScrollView>
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

};

export default PaymentScheduler;
