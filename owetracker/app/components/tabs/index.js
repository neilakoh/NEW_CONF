import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsComponentSize: {},
      selectedTab: typeof props.defaultTab !== 'undefined' ? props.defaultTab : null
    };
  }

  render() {
    const { tabs } = this.props;
    const { tabsComponentSize, selectedTab } = this.state;

    return (
      <View style={[styles.tabs_component_wrapper]} onLayout={(e)=>{
        this.setState({
          tabsComponentSize: e.nativeEvent.layout
        });
      }}>
      {
        Object.keys(tabsComponentSize).length > 0 ?
          tabs.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.tab_sub_wrappers, {height: tabsComponentSize.height, backgroundColor: selectedTab === item.id ? '#1b77c4' : 'transparent'}]} onPress={()=>{
              this.setState({
                selectedTab: item.id
              });
            }}>
              <View>
                <Text style={[styles.tab_text, {color: selectedTab === item.id ? '#ffffff' : '#000000'}]}>{`${item.name}`}</Text>
              </View>
            </TouchableOpacity>
          ))
        :
        null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs_component_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
    borderColor: '#1b77c4',
    borderStyle: 'solid'
  },
  tab_sub_wrappers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_text: {
    fontWeight: 'bold'
  }
});

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  defaultTab: PropTypes.string
};

export default Tabs;
