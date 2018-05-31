import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Pie from 'react-native-pie';
import Icon from 'react-native-vector-icons/FontAwesome';

class ListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      listTitleSize: {},
      pieGraphWrapperSize: {},
      balanceInfoWrapperSize: {},
      boxesContentSize: {}
    };
  }

  transactionStatus() {
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 25,
        height: 25,
        backgroundColor: '#e5e5e5',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Icon name="check" size={20} color="#22a805" />
      </View>
    );
  }

  render() {
    const { listScreenSize, item, onItemListClick } = this.props;
    const { listTitleSize, pieGraphWrapperSize, balanceInfoWrapperSize, boxesContentSize } = this.state;

    return (
      <TouchableOpacity style={[styles.list_item_wrapper, {height: listScreenSize.height * .30, width: listScreenSize.width * .975}]} activeOpacity={0.9} onPress={()=>{
        onItemListClick();
      }}>
        <View style={[styles.list_item_sub_wrapper]}>

          <View style={[styles.list_left_side_wrapper, {width: listScreenSize.width * .30, height: listScreenSize.height * .30}]}>
            <View style={{
              flex: 1,
            }} onLayout={(e)=>{
              this.setState({
                pieGraphWrapperSize: e.nativeEvent.layout
              });
            }}>
            {
              Object.keys(pieGraphWrapperSize).length > 0 ?
              (
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: listScreenSize.width * .30,
                  height: pieGraphWrapperSize.height,
                }}>
                  <Pie
                    radius={(listScreenSize.width * .30) * .25}
                    innerRadius={(listScreenSize.width * .30) * .20}
                    series={[20]}
                    colors={['red']}
                    backgroundColor='#ffffff'
                  />
                  <View style={{
                    position: 'absolute',
                  }}>
                    <Text style={{
                      fontSize: ((listScreenSize.width * .25)) * .125,
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}>100%</Text>
                  </View>
                </View>
              )
              :
              null
            }
            </View>

            <View style={{
              height: (listScreenSize.height * .30) * .40,
              width: listScreenSize.width * .30,
              paddingLeft: 10,
              paddingTop: 10
            }} onLayout={(e)=>{
              this.setState({
                balanceInfoWrapperSize: e.nativeEvent.layout
              });
            }}>
            {
              Object.keys(balanceInfoWrapperSize).length > 0 ?
              (
                <View>
                  <Text style={{
                    color: '#ffffff',
                    fontSize: balanceInfoWrapperSize.height * .175,
                    fontWeight: 'bold'
                  }}>BALANCE</Text>
                  <Text style={{
                    color: '#ffffff',
                    fontSize: balanceInfoWrapperSize.height * .275,
                    fontWeight: 'bold'
                  }}>$2,000,000</Text>
                </View>
              )
              :
              null
            }
            </View>
          </View>

          <View style={[styles.list_right_side_wrapper, {height: listScreenSize.height * .30}]}>

            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{
                flex: 1,
                borderBottomWidth: 0.5,
                borderColor: 'lightgray',
                borderStyle: 'solid',
                width: listScreenSize.width * .60,
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 16
                }}>This is a sample title</Text>
              </View>
              <View style={{
                flex: 1,
                width: listScreenSize.width * .60,
                justifyContent: 'center',
                alignItems: 'flex-start'
              }}>
                <Text style={{
                  fontSize: 12,
                  color: '#a0a0a0'
                }}>This is a sample description here and ad asd asd as</Text>
              </View>
            </View>

            {
              this.transactionStatus()
            }

          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  list_item_wrapper: {
    marginTop: 5,
    backgroundColor: '#ffffff'
  },
  list_item_sub_wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list_left_side_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b77c4'
  },
  list_right_side_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  listScreenSize: PropTypes.object,
  onItemListClick: PropTypes.func,
};

export default ListItem;
