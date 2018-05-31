import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Header from '../header/index';
import Search from '../search/index';
import Tabs from '../tabs/index';
import CustomButton from '../button/index';
import DataList from '../list/index';
import AddTransaction from '../add_transaction/index';

class Splash extends React.Component {
  constructor() {
    super();
    this.state = {
      open_add_transaction: false
    };
  }

  render() {
    const { mobileScreenSize } = this.props;
    const { open_add_transaction } = this.state;

    return (
      <View style={[styles.main_component_wrapper, {width: mobileScreenSize.width}]}>
        <View style={[styles.header, {width: mobileScreenSize.width, height: mobileScreenSize.height * .085}]}>
          <Header
            title={'Dashboard'}
          />
        </View>
        <View style={[styles.search, {width: mobileScreenSize.width, height: mobileScreenSize.height * .075}]}>
          <Search/>
        </View>
        <View style={[styles.tabs, {width: mobileScreenSize.width, height: mobileScreenSize.height * .075}]}>
          <Tabs
            tabs={
              [
                {
                  id: 'owedToMe',
                  name: 'Owed To Me',
                },
                {
                  id: 'owedByMe',
                  name: 'Owed By Me'
                }
              ]
            }
            defaultTab={'owedToMe'}
          />
        </View>
        <View style={[styles.body, {width: mobileScreenSize.width}]}>
          <DataList
            data={[
              {
                _id: '56a1d56a1d6as1d6a5sd156as1d6',
                name: 'Neil',
                amount: 2000,
                balance: 2000,
                totalPaidAmount: 0,
                paymentHistory: {},
                description: 'House Loan',
                contact: '2551199',
                selectedDueDate: null,
                rawSelectedDueDate: null,
                security: true,
                inProgress: true,
                transactionType: 'owedToMe'
              },
              {
                _id: '56a1d56a1d6as1d6a5sd156as1d6',
                name: 'Neil',
                amount: 2000,
                balance: 2000,
                totalPaidAmount: 0,
                paymentHistory: {},
                description: 'House Loan',
                contact: '2551199',
                selectedDueDate: null,
                rawSelectedDueDate: null,
                security: true,
                inProgress: true,
                transactionType: 'owedToMe'
              },
              {
                _id: '56a1d56a1d6as1d6a5sd156as1d6',
                name: 'Neil',
                amount: 2000,
                balance: 2000,
                totalPaidAmount: 0,
                paymentHistory: {},
                description: 'House Loan',
                contact: '2551199',
                selectedDueDate: null,
                rawSelectedDueDate: null,
                security: true,
                inProgress: true,
                transactionType: 'owedToMe'
              },
              {
                _id: '56a1d56a1d6as1d6a5sd156as1d6',
                name: 'Neil',
                amount: 2000,
                balance: 2000,
                totalPaidAmount: 0,
                paymentHistory: {},
                description: 'House Loan',
                contact: '2551199',
                selectedDueDate: null,
                rawSelectedDueDate: null,
                security: true,
                inProgress: true,
                transactionType: 'owedToMe'
              }
            ]}
          />
        </View>
        <View style={[styles.footer, {width: mobileScreenSize.width, height: mobileScreenSize.height * .08}]}>
          <CustomButton
            label='New Transaction'
            bgColor='#05487f'
            txtColor='#ffffff'
            onEvent={()=>{
              this.setState({open_add_transaction: true});
            }}
          />
        </View>
        <AddTransaction
          open={open_add_transaction}
          mobileScreenSize={mobileScreenSize}
          onClose={()=>{this.setState({open_add_transaction: false})}}
          onSave={()=>{alert('save')}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_component_wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    // backgroundColor: 'red'
  },
  search: {
    // backgroundColor: 'blue'
  },
  tabs: {
    // backgroundColor: 'gray'
  },
  body: {
    flex: 1,
    // backgroundColor: 'green'
  },
  footer: {
    // backgroundColor: 'yellow'
  }
});

Splash.propTypes = {
  mobileScreenSize: PropTypes.object.isRequired
};

export default Splash;
