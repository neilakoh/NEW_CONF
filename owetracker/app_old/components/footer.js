import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = ({screenSize, owedToMe, owedByMe, selectedTab, addOweEvent, openAddOweModal}) => {
  return (
    <View style={{
      width: screenSize.width,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}>

      <TouchableOpacity style={{
        width: screenSize.width * .15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Icon name="bar-chart" size={(screenSize.width * .15) * .50} color="#ffffff" />
      </TouchableOpacity>

      <TouchableOpacity style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: selectedTab === "owedToMe" ? '#0087c1' : 'transparent'
      }} onPress={owedToMe}>
        <View>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Owed to Me</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: selectedTab === "owedByMe" ? '#0087c1' : 'transparent'
      }} onPress={owedByMe}>
        <View>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Owed By Me</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{
        width: screenSize.width * .15,
        justifyContent: 'center',
        alignItems: 'center',
      }} onPress={()=>{openAddOweModal(true)}}>
        <Icon name="plus-circle" size={(screenSize.width * .15) * .60} color="#ffffff" />
      </TouchableOpacity>

    </View>
  );
};

Footer.propTypes = {
  screenSize: PropTypes.object.isRequired,
  owedToMe: PropTypes.func.isRequired,
  owedByMe: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  addOweEvent: PropTypes.func.isRequired,
  openAddOweModal: PropTypes.func.isRequired
};



export default Footer;
