import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import ListItem from './listItem';
import TransactionDetails from '../transaction_details/index';

class DataList extends React.Component {
  constructor() {
    super();
    this.state = {
      listComponentSize: {},
      open_trans_details: false
    };
  }

  render() {
    const { data } = this.props;
    const { listComponentSize, open_trans_details } = this.state;

    return (
      <View style={[styles.list_component_wrapper]} onLayout={(e)=>{
        this.setState({
          listComponentSize: e.nativeEvent.layout
        });
      }}>
        <TransactionDetails open={open_trans_details} />
      {
        Object.keys(listComponentSize).length > 0 ?
        (
          data.length > 0 ?
            <ScrollView>
            {
              data.map((item, index)=>(
                <ListItem key={index} item={item} listScreenSize={listComponentSize} onItemListClick={()=>{this.setState({open_trans_details: true})}} />
              ))
            }
            </ScrollView>
          :
            (
              <View style={[styles.no_available_wrapper, {width: listComponentSize.width}]}>
                <Text>No Data Available</Text>
              </View>
            )

        )
        :
        (
          <ActivityIndicator size="large" color="#0000ff" />
        )
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list_component_wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#efefef'
  },
  no_available_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

DataList.propTypes = {
  data: PropTypes.array.isRequired
};

export default DataList;
