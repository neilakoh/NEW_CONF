import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment, { locale } from 'moment';
import DeepEqual from 'deep-equal';
import * as Animatable from 'react-native-animatable';
import Pie from 'react-native-pie';
import { pBarPercentage, getPBarColor } from '../modules/index.js';
import currencyFormatter from 'currency-formatter';

import InfoTop from './viewListDetailsComponent/infoTop.js';
import InfoBottom from './viewListDetailsComponent/infoBottom.js';
import { generateId } from '../modules/index.js';

import {bindActionCreators} from 'redux';
import * as appActions from '../actions/index';
import { connect } from 'react-redux';

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
    color: '#7fff00'
  },
  {
    minVal: 91,
    maxVal: 100,
    color: '#88f718'
  }
];

class ViewListDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      statsScreenSize: {},
      listScreenSize: {},
      openAddPayment: false,
      showMoreInfo: false,
      prepareMoreInfo: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(DeepEqual(nextProps, this.props) && DeepEqual(nextState, this.state)) {
      return false;
    } else {
      return true;
    }
  }

  VLDAddPaymentTransactionModal(screenSize, openAddPayment, openViewListDetails) {
    let getOffsetSize = screenSize.width - screenSize.height;
    if(openAddPayment) {
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
            alignItems: 'center'
          }}
        >
          <KeyboardAvoidingView behavior={'position'} style={{alignItems: 'center'}} keyboardVerticalOffset={getOffsetSize}>
            <ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
              <View style={{
                width: screenSize.width * .85,
                height: screenSize.height * .30,
                backgroundColor: '#ffffff',
                borderRadius: 10
              }}>

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
                    <Text style={{fontWeight: 'bold', color: '#ffffff', fontSize: ((screenSize.height * .25) * .30) * .35}}>Add Payment</Text>
                  </View>
                  <TouchableOpacity style={{
                    width: (screenSize.width * .85) * .20,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }} onPress={()=>{
                    this.setState({
                      openAddPayment: false
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
                  padding: 5
                }}>

                  <TextInput
                    ref='paymentAmount'
                    placeholder='Enter paid amount'
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={{
                      width: screenSize.width * .75,
                      borderStyle: 'solid',
                      borderColor: '#bcbcbc',
                      borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
                      fontSize: 15,
                    }}
                    onSubmitEditing={()=>{
                      this.refs.paymentDetails.focus();
                    }}
                  />

                  <TextInput
                    ref='paymentDetails'
                    placeholder='Say something about this payment'
                    keyboardType='default'
                    returnKeyType='done'
                    style={{
                      width: screenSize.width * .75,
                      paddingTop: 15,
                      paddingBottom: 5,
                      marginTop: 10,
                      borderStyle: 'solid',
                      borderColor: '#bcbcbc',
                      borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
                      fontSize: 15
                    }}
                    onSubmitEditing={()=>{
                      let id = generateId();
                      const { actions, owedToMeList, owedByMeList } = this.props;
                      const { paymentDetails, paymentAmount } = this.refs;
                      const copyTransactionInfo = {...openViewListDetails};
                      const copyOwedToMeList = {...owedToMeList};
                      const copyOwedByMeList = {...owedByMeList};

                      if(paymentDetails._lastNativeText && paymentAmount._lastNativeText) {
                        let prevBal = parseInt(copyTransactionInfo.payload.balance, 10);
                        let payedAmount = parseInt(paymentAmount._lastNativeText, 10);

                        if(prevBal >= payedAmount) {
                          let newBal = prevBal - payedAmount;

                          copyTransactionInfo.payload.paymentHistory[id] = {
                            _id: id,
                            previousBalance: copyTransactionInfo.payload.balance,
                            newBalance: newBal.toString(),
                            paidAmount: paymentAmount._lastNativeText,
                            description: paymentDetails._lastNativeText,
                            createdAt: new Date(),
                            updatedAt: null
                          }
                          copyTransactionInfo.payload['balance'] = newBal.toString();
                          copyTransactionInfo.payload['inProgress'] = newBal < 1 ? false : true;

                          if(openViewListDetails.payload.transactionType === "owedToMe") {
                            copyOwedToMeList[copyTransactionInfo.payload._id] = copyTransactionInfo.payload;
                            actions.OwedToMeList(copyOwedToMeList)
                          }
                          if(openViewListDetails.payload.transactionType === "owedByMe") {
                            copyOwedByMeList[copyTransactionInfo.payload._id] = copyTransactionInfo.payload;
                            actions.OwedByMeList(copyOwedByMeList)
                          }

                          this.setState({
                            openAddPayment: false
                          });

                        } else {
                          console.log('Payed Amount must be less than owed amount.');
                        }
                      } else {
                        console.log('lacking data');
                      }

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

  VLDHeader(screenSize, actions, payload, showMoreInfo) {
    return (
      <View style={{
        width: screenSize.width,
        height: screenSize.height * .10,
        backgroundColor: '#006793',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          <Text style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: (screenSize.width * .10) * .55,
            marginLeft: 10
          }}>Transaction Details</Text>
          <Text style={{
            color: 'yellow',
            fontWeight: 'bold',
            fontSize: (screenSize.width * .10) * .30,
            marginLeft: 10
          }}>{payload.name}</Text>
        </View>

        <View style={{
          width: screenSize.width * .125,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Icon name={payload.security ? payload.security.isProtected ? "lock" : "unlock-alt" : "unlock-alt"} size={(screenSize.width * .15) * .60} color={payload.security ? payload.security.isProtected ? '#209600' : "#ff5c2b" : "#ff5c2b"} />
        </View>

        <TouchableOpacity style={{
          width: screenSize.width * .125,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:  showMoreInfo ? '#012c42' : 'transparent'
        }} onPress={()=>{
          if(showMoreInfo) {
            this.setState({
              showMoreInfo: false
            });
          } else {
            this.setState({
              showMoreInfo: true,
              prepareMoreInfo: true
            });
          }
        }}>
          <View>
            <Icon name={"info-circle"} size={(screenSize.width * .15) * .60} color={"#ffffff"} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{
          width: screenSize.width * .125,
          justifyContent: 'center',
          alignItems: 'center',
        }} onPress={()=>{
          actions.ViewListDetails({
            open: false,
            payload: {}
          });
          this.setState({
            showMoreInfo: false,
            prepareMoreInfo: false
          });
        }}>
          <Icon name="chevron-circle-right" size={(screenSize.width * .15) * .60} color="#ffffff" />
        </TouchableOpacity>

      </View>
    );
  }

  VLDStats(screenSize, statsScreenSize, payload, showMoreInfo, prepareMoreInfo) {
    return (
      <View style={{
        height: (screenSize.height) * .26,
        width: screenSize.width,
        backgroundColor: '#012c42',
        justifyContent: 'center',
        alignItems: 'center'
      }} onLayout={(e)=>{
        this.setState({
          statsScreenSize: e.nativeEvent.layout
        });
      }}>
      {
        Object.keys(statsScreenSize).length > 0 && Object.keys(payload).length > 0 ?
          (
            <View>
              {
                this.statsDetailsLayout(screenSize, statsScreenSize, payload, showMoreInfo, prepareMoreInfo)
              }
            </View>
          )
        :
        (<ActivityIndicator size="large" color="#006793" />)
      }
      </View>
    );
  }

  statsDetailsLayout(screenSize, statsScreenSize, payload, showMoreInfo, prepareMoreInfo) {
    let getLastPaidAmount = Object.entries(payload.paymentHistory).length > 0 ? Object.entries(payload.paymentHistory)[Object.entries(payload.paymentHistory).length - 1][1].paidAmount : "0";
    let getTotalPaidAmount = payload.amount - payload.balance;

    return (
      <View style={{
        height: statsScreenSize.height * .95,
        width: statsScreenSize.width * .98,
      }}>

       <View style={{
          height: statsScreenSize.height * .15,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 5,
        }}><Text style={{color: '#76cc4b', fontWeight: 'bold', fontSize: statsScreenSize.height * .08}}>Last Paid Amount</Text></View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 5,
        }}><Text style={{color: '#ffffff', fontSize: 25, fontWeight: 'bold', fontSize: statsScreenSize.height * .125}}>{currencyFormatter.format(getLastPaidAmount, {code: 'USD'})}</Text></View>

        <View style={{
          height: statsScreenSize.height * .15,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 5,
        }}><Text style={{color: '#76cc4b', fontWeight: 'bold', fontSize: statsScreenSize.height * .08}}>Balance</Text></View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 5,
        }}><Text style={{color: '#ffffff', fontSize: 25, fontWeight: 'bold', fontSize: statsScreenSize.height * .125}}>{currencyFormatter.format(payload.balance, {code: 'USD'})}</Text></View>

        <View style={{
          height: statsScreenSize.height * .15,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 5,
        }}><Text style={{color: '#76cc4b', fontWeight: 'bold', fontSize: statsScreenSize.height * .08}}>Total Paid Amount</Text></View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 5,
        }}><Text style={{color: '#ffffff', fontSize: 25, fontWeight: 'bold', fontSize: statsScreenSize.height * .125}}>{currencyFormatter.format(getTotalPaidAmount, {code: 'USD'})}</Text></View>

        {
          prepareMoreInfo ? this.moreInfo(statsScreenSize, showMoreInfo, payload) : null
        }
        {
          this.statsPieGraph(statsScreenSize, payload)
        }
      </View>
    );
  }

  moreInfo(statsScreenSize, showMoreInfo, payload) {
    return (
      <Animatable.View
        animation={showMoreInfo ? "bounceIn" : "bounceOut"}
        direction="normal"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: statsScreenSize.height * .95,
          width: statsScreenSize.width * .98,
          backgroundColor: 'rgba(0,0,0,0.9)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          padding: 5
        }}
      >
        <View style={{
          width: statsScreenSize.width * .98,
          height: statsScreenSize.height * .10,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 10
        }}><Text style={{color: '#d18000', fontWeight: 'bold', fontSize: statsScreenSize.height * .08}}>Contact Info:</Text></View>
        <View style={{
          width: statsScreenSize.width * .98,
          height: statsScreenSize.height * .15,
          paddingLeft: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}><Text style={{color: '#ffffff', fontSize: statsScreenSize.height * .08}}>{`${payload.contact}`}</Text></View>
        <View style={{
          width: statsScreenSize.width * .98,
          height: statsScreenSize.height * .15,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 10
        }}><Text style={{color: '#d18000', fontWeight: 'bold', fontSize: statsScreenSize.height * .08}}>Description:</Text></View>
        <View style={{
          flex: 1,
          width: statsScreenSize.width * .98,
          paddingLeft: 10
        }}><Text style={{color: '#ffffff', fontSize: statsScreenSize.height * .08}}>{`${payload.description}`}</Text></View>
        <View style={{
          width: statsScreenSize.width * .98,
          height: statsScreenSize.height * .10,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 10,
        }}><Text style={{color: '#d18000', fontWeight: 'bold', fontSize: statsScreenSize.height * .08}}>Created Date:</Text></View>
        <View style={{
          width: statsScreenSize.width * .98,
          height: statsScreenSize.height * .15,
          paddingLeft: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}><Text style={{color: '#ffffff', fontSize: statsScreenSize.height * .08}}>{moment(payload.createdAt).format('LL')} </Text></View>
      </Animatable.View>
    );
  }

  statsPieGraph(statsScreenSize, payload) {
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: statsScreenSize.height * .95,
        width: statsScreenSize.width * .35,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Pie
          radius={statsScreenSize.width * .12}
          innerRadius={statsScreenSize.width * .08}
          series={[pBarPercentage(payload.amount, payload.balance)]}
          colors={[getPBarColor(pBarPercentage(payload.amount, payload.balance), colorCodes)]}
          backgroundColor='rgbe(255,255,255,0.25'
        />
        <View style={{
          position: 'absolute'
        }}>
          <Text style={{
            fontSize: (statsScreenSize.width * .20) * .20,
            fontWeight: 'bold',
            color: '#ffffff'
          }}>{pBarPercentage(payload.amount, payload.balance)}%</Text>
        </View>
      </View>
    )
  }

  VLDHistoryLabel(screenSize) {
    return (
      <View style={{
        width: screenSize.width,
        height: screenSize.height * .06,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        <View style={{
          flex: 1,
          height: screenSize.height * .06,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 5
        }}>
          <Text style={{fontWeight: 'bold', fontSize: (screenSize.height * .06) * .50, color: '#afafaf'}}>Payment History</Text>
        </View>
        <View style={{
          width: screenSize.width * .15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity style={{
            width: screenSize.width * .125,
            height: screenSize.height * .06,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View>
              <Icon name="filter" size={(screenSize.width * .15) * .50} color="#afafaf" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  VLDList(screenSize, listScreenSize, paymentHistory) {
    return (
      <View style={{
        flex: 1,
        width: screenSize.width,
      }} onLayout={(e)=>{
        this.setState({
          listScreenSize: e.nativeEvent.layout
        });
      }}>
      <ScrollView>
      {
        Object.keys(listScreenSize).length > 0 ?
          (
            <View>

              {
                Object.entries(paymentHistory).map((item, index)=>(
                  <View key={`${item[0]}-${index}`} style={{
                    backgroundColor: index % 2 === 0 ? '#e2e2e2' : '#ffffff',
                    width: listScreenSize.width,
                    height: listScreenSize.height * .15,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                    <View style={{
                      width: listScreenSize.width * .15,
                      backgroundColor: '#dbdbdb',
                    }}>
                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Text style={{fontSize: (listScreenSize.width * .15) * .60, fontWeight: 'bold', color: '#8c8c8c'}}>{moment(item[1].createdAt).format('LL').split(' ')[1].replace(/,/g, '')}</Text>
                      </View>
                      <View style={{
                        height: (listScreenSize.height * .08) * .60,
                        backgroundColor: '#bfbfbf',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Text style={{fontSize: (listScreenSize.width * .15) * .17, fontWeight: 'bold'}}>{moment(item[1].createdAt).format('LL').split(' ')[0]}</Text>
                      </View>
                    </View>

                    <View style={{
                      flex: 1,
                    }}>
                      <View style={{
                        flex: 1,
                        paddingLeft: 10,
                        justifyContent: 'center'
                      }}>
                        <Text style={{fontWeight: 'bold', fontSize: (listScreenSize.height * .08) * .50}}>{item[1].description}</Text>
                      </View>

                      <View style={{
                        flex: 1,
                        paddingLeft: 10,
                        justifyContent: 'center'
                      }}>
                        <Text style={{fontSize: (listScreenSize.height * .08) * .40}}>{moment(item[1].createdAt).format('LT')}</Text>
                      </View>

                    </View>

                    <View style={{
                      width: listScreenSize.width * .25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Text style={{fontWeight: 'bold', fontSize: (listScreenSize.height * .08) * .45}}>-{`${currencyFormatter.format(item[1].paidAmount, { code: 'USD' })}`}</Text>
                    </View>

                  </View>
                ))
              }

            </View>
          )
        :
        (<ActivityIndicator size="large" color="#006793" />)
      }
      </ScrollView>
        <TouchableOpacity style={{
          width: screenSize.width * .15,
          height: screenSize.width * .15,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 5,
          right: 5,
          borderRadius: 360
        }} onPress={()=>{
          this.setState({
            openAddPayment: true
          });
        }}>
          <View>
            <Icon name="plus-circle" size={screenSize.width * .15} color="#015c7a" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { openViewListDetails, screenSize, actions } = this.props;
    const { statsScreenSize, listScreenSize, openAddPayment, showMoreInfo, prepareMoreInfo } = this.state;

    return (
      <Modal
        visible={openViewListDetails.open}
        animationType={'slide'}
        onRequestClose={() => {
          actions.ViewListDetails({
            open: false,
            payload: {}
          });
          this.setState({
            showMoreInfo: false,
            prepareMoreInfo: false
          });
        }}
      >
      {
        this.VLDHeader(screenSize, actions, openViewListDetails.payload, showMoreInfo)
      }
      {
        this.VLDStats(screenSize, statsScreenSize, openViewListDetails.payload, showMoreInfo, prepareMoreInfo)
      }
      {
        this.VLDHistoryLabel(screenSize)
      }
      {
        Object.keys(openViewListDetails.payload).length > 0 ? this.VLDList(screenSize, listScreenSize, openViewListDetails.payload.paymentHistory) : null
      }
      {
        this.VLDAddPaymentTransactionModal(screenSize, openAddPayment, openViewListDetails)
      }
      </Modal>
    );
  }
}

ViewListDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  screenSize: PropTypes.object.isRequired,
  openViewListDetails: PropTypes.object.isRequired,
  owedToMeList: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    screenSize: ownProps.screenSize,
    openViewListDetails: ownProps.openViewListDetails,
    owedToMeList: state.OwedToMeList.list,
    owedByMeList: state.OwedByMeList.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewListDetails);
