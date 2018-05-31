import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, Dimensions, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
import Pie from 'react-native-pie';

import {bindActionCreators} from 'redux';
import * as appActions from '../actions/index';
import { connect } from 'react-redux';

import { pBarPercentage, getPBarColor } from '../modules/index.js';

const { height, width } = Dimensions.get('window');

const colorCodes = [
  {
    minVal: 1,
    maxVal: 10,
    color: '#ff0000'
  },
  {
    minVal: 11,
    maxVal: 20,
    color: '#ff6a00'
  },
  {
    minVal: 21,
    maxVal: 30,
    color: '#ff8c00'
  },
  {
    minVal: 31,
    maxVal: 40,
    color: '#ffaa00'
  },
  {
    minVal: 41,
    maxVal: 50,
    color: '#ffcc00'
  },
  {
    minVal: 51,
    maxVal: 60,
    color: '#fff200'
  },
  {
    minVal: 61,
    maxVal: 70,
    color: '#d8ff00'
  },
  {
    minVal: 71,
    maxVal: 80,
    color: '#aaff00'
  },
  {
    minVal: 81,
    maxVal: 90,
    color: '#85c603'
  },
  {
    minVal: 91,
    maxVal: 100,
    color: '#85c407'
  }
];

class ListComponent extends React.Component {
  renderOweBalance(balance, owedAmount) {
    let getAmountLength = balance + ' / ' + owedAmount;
    // let dynamicFontSize = ((width - ((width * .20) + (width * .15))) / getAmountLength.length) / 2;
    let dynamicFontSize = (width - (width * .20) + (width * .15)) * .03;
    return (
      <Text style={{
        fontSize: dynamicFontSize,
        fontWeight: 'bold'
      }}>
        {`$${balance} / $${owedAmount}`}
      </Text>
    )
  }

  renderList(owedToMeList, owedByMeList, selectedTab) {
    const { actions } = this.props;
    let list = selectedTab === "owedToMe" ? owedToMeList : owedByMeList;

    return (
      Object.entries(list).map((item, index) => (
        <View key={item[0]+'-'+index}>
          <View style={{
            backgroundColor: '#d6d6d6',
            marginTop: index === 0 ? 10 : 10,
            marginLeft: 10,
            marginRight: 10,
            height: height * .10,
            shadowColor: '#9b9b9b',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1.5,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>

            <TouchableOpacity style={{
              position: 'absolute',
              backgroundColor: 'rgba(237, 237, 237, 0.3)',
              top: 0,
              left: 0,
              height: height * .10,
              width: width * .95,
              zIndex: 1
            }} onPress={()=>{
              actions.ViewListDetails({
                open: true,
                payload: item[1]
              });
            }}>
              <View>

              </View>
            </TouchableOpacity>

            {/** PIE GRAPH COMPONENT **/}
            <View style={{
              width: width * .20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#006793'
            }}>
              <Pie
                radius={(width * .20) * .35}
                innerRadius={(width * .20) * .25}
                series={[isNaN(pBarPercentage(item[1].amount, item[1].balance)) ? 0 : pBarPercentage(item[1].amount, item[1].balance)]}
                colors={[getPBarColor(pBarPercentage(item[1].amount, item[1].balance), colorCodes)]}
                backgroundColor='#ffffff'
              />
              <View style={{
                position: 'absolute'
              }}>
                <Text style={{
                  fontSize: (width * .20) * .125,
                  fontWeight: 'bold',
                  color: '#ffffff'
                }}>{pBarPercentage(item[1].amount, item[1].balance)}%</Text>
              </View>
            </View>

            {/** LIST INFO COMPONENT **/}
            <View style={{
              flex: 1,
            }}>

              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: (width - (width * .20) + (width * .15)) * .06,
                  fontWeight: 'bold',
                  color: '#184e6d'
                }}>{item[1].name}</Text>
              </View>

              <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>

                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {this.renderOweBalance(item[1].balance, item[1].amount)}
                </View>

              </View>

            </View>

            {/** ARROW COMPONENT **/}
            <View style={{
              width: width * .15,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2.5
            }}>
              <View style={{
                flex: 1,
                width: width * .15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Icon name="chevron-right" size={(width * .15) * .60} color="#566d18" />
              </View>
              <View style={{
                // backgroundColor: item[1].inProgress ? '#9cba5d' : '#a5ce4c',
                justifyContent: 'center',
                alignItems: 'center',
                width: width * .15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontWeight: 'bold',
                  color: item[1].inProgress ? '#ff0000' : '#566d18',
                  fontSize: (width * .15) * .175
                }}
                >{item[1].inProgress ? "Progress" : "Complete"}</Text>
              </View>
            </View>

          </View>
        </View>
      ))
    )
  }
  render() {
    const { owedToMeList, owedByMeList, selectedTab } = this.props;

    return (
      <ScrollView>
      {
        this.renderList(owedToMeList, owedByMeList, selectedTab)
      }
      </ScrollView>
    );
  }
}

ListComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  selectedTab: PropTypes.string.isRequired,
  owedByMeList: PropTypes.object.isRequired,
  owedToMeList: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    owedToMeList: ownProps.owedToMeList,
    owedByMeList: ownProps.owedByMeList,
    selectedTab: ownProps.selectedTab
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
