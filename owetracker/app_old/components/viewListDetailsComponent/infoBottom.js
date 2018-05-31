import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const InfoBottom = ({screenSize, statsScreenSize, payload}) => {
  return (
    <View style={{
      width: screenSize.width,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}>
      <View style={{
        width: screenSize.width * .25,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>
          <Text style={{color: payload.inProgress ? '#ffd53d' : '#00cc1b', fontWeight: 'bold'}}>{payload.inProgress ? 'In Progress' : 'Completed'}</Text>
        </Text>
      </View>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5
      }}>
        <Text>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Due: </Text>
          <Text style={{color: '#00cc1b', fontWeight: 'bold'}}>{payload.rawSelectedDueDate !== null ? moment(payload.rawSelectedDueDate).format('L') : 'None'}</Text>
        </Text>
      </View>

      <View style={{
        width: screenSize.width * .30,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        <View style={{
          width: (screenSize.width * .30) * .25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Icon name={payload.security.isProtected ? "lock" : "unlock-alt"} size={(screenSize.width * .30) * .20} color="#ffffff" />
        </View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{color: payload.security.isProtected ? '#00cc1b' : '#ff2b2b', fontWeight: 'bold'}}>{payload.security.isProtected ? 'Protected' : 'None'}</Text>
        </View>
      </View>
    </View>
  );
}

InfoBottom.propTypes = {
  screenSize: PropTypes.object.isRequired,
  statsScreenSize: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired,
};

export default InfoBottom;
