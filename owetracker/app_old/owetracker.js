import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {bindActionCreators} from 'redux';
import * as appActions from './actions/index';
import { connect } from 'react-redux';
import DeepEqual from 'deep-equal';

import Footer from './components/footer.js';
import AddOweModal from './components/openAddOweModal.js';
import ViewListDetailsComponent from './components/viewListDetails.js';
import ListComponent from './components/ListComponent.js';

const { height, width } = Dimensions.get('window');

class OweTracker extends React.Component {
  constructor() {
    super();

    this.owedToMe = this.owedToMe.bind(this);
    this.owedByMe = this.owedByMe.bind(this);
    this.openAddOweModal = this.openAddOweModal.bind(this);
    this.addOweEvent = this.addOweEvent.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(DeepEqual(nextProps, this.props) && DeepEqual(nextState, this.state)) {
      return false;
    } else {
      return true;
    }
  }

  owedByMe() {
    const { actions } = this.props;
    actions.SelectedTab("owedByMe");
  }
  owedToMe() {
    const { actions } = this.props;
    actions.SelectedTab("owedToMe");
  }
  openAddOweModal(value) {
    const { actions } = this.props;
    actions.OpenAddOweModal(value);
  }
  addOweEvent(tab) {
    console.log(tab);
  }

  render() {
    const { selectedTab, openAddOweModal, selectedFormField, actions, owedToMeList, owedByMeList, openViewListDetails } = this.props;

    return(
      <View style={styles.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.category}>

        </View>
        <View style={styles.body}>
          <ListComponent
            owedToMeList={owedToMeList}
            owedByMeList={owedByMeList}
            selectedTab={selectedTab}
          />
        </View>
        <View style={styles.footer}>
          <Footer
            screenSize={{width: width, height: height}}
            owedToMe={this.owedToMe}
            owedByMe={this.owedByMe}
            addOweEvent={this.addOweEvent}
            openAddOweModal={this.openAddOweModal}
            selectedTab={selectedTab}
          />
        </View>

        <AddOweModal
          screenSize={{width: width, height: height}}
          openAddOweModal={openAddOweModal}
          selectedTab={selectedTab}
          selectedFormField={selectedFormField}
        />

        <ViewListDetailsComponent
          screenSize={{width: width, height: height}}
          openViewListDetails={openViewListDetails}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: width,
    height: height * .10,
    backgroundColor: '#006793'
  },
  category: {
    width: width,
    height: height * .08,
    backgroundColor: '#e8e8e8'
  },
  body: {
    width: width,
    flex: 1,
  },
  footer: {
    width: width,
    height: height * .08,
    backgroundColor: '#006793'
  }
});

OweTracker.propTypes = {
  actions: PropTypes.object.isRequired,
  selectedTab: PropTypes.string.isRequired,
  openAddOweModal: PropTypes.bool.isRequired,
  selectedFormField: PropTypes.string.isRequired,
  owedToMeList: PropTypes.object.isRequired,
  owedByMeList: PropTypes.object.isRequired,
  openViewListDetails: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    selectedTab: state.SelectedTab.tab,
    openAddOweModal: state.OpenAddOweModal.open,
    openViewListDetails: state.ViewListDetails.data,
    selectedFormField: state.AddOweForm.formField,
    owedToMeList: state.OwedToMeList.list,
    owedByMeList: state.OwedByMeList.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OweTracker);
