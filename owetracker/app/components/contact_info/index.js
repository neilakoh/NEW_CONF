import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput
} from 'react-native';

class ContactInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      contactInfoWrapperSize: {},
      contactInfo: {
        type: 'mobile',
        label: 'Mobile',
        value: '',
        keyType: 'default'
      },
      openPicker: false,
      pickerOptions: [
        {name: 'email', type: 'email-address', label: 'Email'},
        {name: 'mobile', type: 'numeric', label: 'Mobile'},
        {name: 'telephone', type: 'numeric', label: 'Telephone'},
        {name: 'location', type: 'default', label: 'Location'}
      ]
    }
  }
  render() {
    const { contactInfoWrapperSize, contactInfo, openPicker, pickerOptions } = this.state;

    return (
      <View style={styles.contact_info_wrapper} onLayout={(e)=>{
        this.setState({contactInfoWrapperSize: e.nativeEvent.layout});
      }}>
      {
        Object.keys(contactInfoWrapperSize).length > 0 ?
        (
          <View style={styles.contact_info_sub_wrapper}>
            <TouchableOpacity style={[styles.select_contact_type, { width: contactInfoWrapperSize.width * .325 }]} onPress={()=>this.setState({openPicker: true})}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                <Text>{`${contactInfo.label}`} </Text>
                <Image source={require('./angle-down.png')} style={{height: contactInfoWrapperSize.height * .35, width:  contactInfoWrapperSize.height * .35}} resizeMode="contain"/>
              </View>
            </TouchableOpacity>

            <View style={styles.contact_info_input}>
              <TextInput
                placeholder='Enter contact info'
                keyboardType={contactInfo.keyType}
                style={{flex: 1}}
              />
            </View>
          </View>
        )
        :
        null
      }
        <Modal
          animationType="slide"
          transparent={true}
          visible={openPicker}
          onRequestClose={() => {}}
        >
          <View style={styles.picker_wrapper}>
            <View style={{ width: contactInfoWrapperSize.width * .90, backgroundColor: '#ffffff' }}>
            {
              pickerOptions.map((item, index) => (
                <TouchableOpacity key={index} style={{
                  height: contactInfoWrapperSize.height * .90,
                  justifyContent: 'center',
                  paddingLeft: 10,
                  borderColor: '#d6d6d6',
                  borderWidth: 1,
                  backgroundColor: contactInfo.type === item.name ? '#d6d6d6' : '#ffffff'
                }} activeOpacity={0.5} onPress={() => {
                  this.setState({
                    contactInfo: {
                      type: item.name,
                      label: item.label,
                      value: '',
                      keyType: item.type
                    }
                  })
                }}>
                  <View>
                    <Text style={{fontWeight: 'bold'}}>{`${item.label}`}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
            </View>

            <TouchableOpacity style={{
              backgroundColor: '#9ed81a',
              margin: 10,
              height: contactInfoWrapperSize.height * .75,
              width: contactInfoWrapperSize.width * .35,
              borderRadius: 360,
              justifyContent: 'center',
              alignItems: 'center'
            }} onPress={() => this.setState({openPicker: false})}>
              <View>
                <Text style={{fontWeight: 'bold'}}>CLOSE</Text>
              </View>
            </TouchableOpacity>

          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contact_info_wrapper: {
    flex: 1,
    borderColor: '#000000',
    borderBottomWidth: 1.5
  },
  contact_info_sub_wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  select_contact_type: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  picker_wrapper: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contact_info_input: {
    flex: 1
  },
  contact_input_wrapper: {
    flex: 1
  }
});

ContactInfo.propTypes = {
  styles: PropTypes.object
};

export default ContactInfo;
