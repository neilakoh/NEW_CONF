import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchComponentSize: {},
      searchKeys: ''
    };
  }

  render() {
    const { searchComponentSize, searchKeys } = this.state;

    return (
      <View style={[styles.search_component_wrapper]} onLayout={(e)=>{
        this.setState({
          searchComponentSize: e.nativeEvent.layout
        });
      }}>
      {
        Object.keys(searchComponentSize).length > 0 ?
        (
          <View style={[styles.search_sub_wrapper, {height: searchComponentSize.height}]}>
            <View style={[styles.icon_wrapper, {width: searchComponentSize.width * .15}]}>
              <Icon name="search" size={(searchComponentSize.width * .15) * .60} color="#1b77c4" />
            </View>
            <View style={[styles.text_box_wrapper]}>
              <TextInput
                placeholder='Search'
                style={[styles.textbox]}
                value={`${searchKeys}`}
                onChangeText={(text)=>{
                  this.setState({
                    searchKeys: text
                  });
                }}
              />
            </View>
            {
              searchKeys !== '' ?
              (
                <TouchableOpacity style={[styles.icon_wrapper, {width: searchComponentSize.width * .15}]} activeOpacity={0.5} onPress={()=>{
                  this.setState({
                    searchKeys: ''
                  });
                }}>
                  <View>
                    <Icon name="close" size={(searchComponentSize.width * .15) * .60} color="#1b77c4" />
                  </View>
                </TouchableOpacity>
              )
              :
              null
            }
          </View>
        )
        :
        null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search_component_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#1b77c4',
    borderStyle: 'solid'
  },
  search_sub_wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_box_wrapper: {
    flex: 1,
    padding: 5,
  },
  textbox: {
    flex: 1,
  }
});

Search.propTypes = {

};

export default Search;
