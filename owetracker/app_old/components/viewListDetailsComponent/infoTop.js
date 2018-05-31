import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const InfoTop = ({screenSize, statsScreenSize, payload}) => {
  return (
    <View style={{
      width: screenSize.width,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 5
      }}>
        <Text>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Paid: </Text>
          <Text style={{color: '#00cc1b', fontWeight: 'bold'}}>${payload.totalPaidAmount}</Text>
        </Text>
      </View>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 5
      }}>
        <Text>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Balance: </Text>
          <Text style={{color: '#00cc1b', fontWeight: 'bold'}}>${payload.balance}</Text>
        </Text>
      </View>

      <View style={{
        width: (screenSize.width * .30) * .25,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 5,
      }}>
        <Icon name={"mobile"} size={(screenSize.width * .30) * .20} color="#ffffff" />
      </View>
      <View style={{
        width: (screenSize.width * .30) * .25,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 5,
      }}>
        <Icon name={"info-circle"} size={(screenSize.width * .30) * .15} color="#ffffff" />
      </View>
    </View>
  );
}

InfoTop.propTypes = {
  screenSize: PropTypes.object.isRequired,
  statsScreenSize: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired,
};

export default InfoTop;
