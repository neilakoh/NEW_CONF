import PropTypes from 'prop-types';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import {bindActionCreators} from 'redux';
import * as courseAction from '../actions/index';
import { connect } from 'react-redux';
import _ from 'underscore';

const {height, width} = Dimensions.get('window');

class PersonalityTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentLayoutSize: {},
      imageLayoutSize: {},
      questionsLayoutSize: {},
      questionsNavSize: {},
      questionChoicesSize: {},
      loadedQuestion: props.lastAnsweredQuestion ? props.lastAnsweredQuestion : 0,
      selectedOption: ''
    };

    this.done = this.done.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state)) {
      return false;
    } else {
      return true;
    }
  }

  done() {
    const { whenDone } = this.props;

    /** THIS IS FOR EXTERNAL FUNCTIONS **/
    if(whenDone.length > 0) {
      for(i=0; i<whenDone.length; i++) {
        whenDone[i]();
      }
    }

  }

  initialLayout(
    parentLayoutSize,
    imageLayoutSize,
    questionsLayoutSize,
    questionsNavSize,
    loadedQuestion,
    dataLength,
    questionInfo,
    questionChoicesSize,
    changeOptionLabels,
    selectedOption,
    allowSkip
  ) {
    return (
      <View>
        <View style={{
          height: parentLayoutSize.height / 2,
          backgroundColor: '#000000',
          width: parentLayoutSize.width,
          justifyContent: 'center',
          alignItems: 'center'
        }} onLayout={(e)=>{
          this.setState({
            imageLayoutSize: e.nativeEvent.layout
          });
        }}>
        {
          Object.keys(imageLayoutSize).length > 0 ?
            (<View>
              {
                this.imageLayout(questionsLayoutSize, loadedQuestion, questionInfo.question)
              }
            </View>)
          :
          (
            <ActivityIndicator size="large" color="#0000ff" />
          )
        }
        </View>
        <View style={{
          height: parentLayoutSize.height / 2,
          backgroundColor: '#000000',
          width: parentLayoutSize.width,
          justifyContent: 'center',
          alignItems: 'center'
        }} onLayout={(e)=>{
          this.setState({
            questionsLayoutSize: e.nativeEvent.layout
          });
        }}>
        {
          Object.keys(questionsLayoutSize).length > 0 ?
            (<View>
              {
                this.questionLayout(
                  questionsLayoutSize,
                  questionsNavSize,
                  loadedQuestion,
                  dataLength,
                  questionInfo.options,
                  questionChoicesSize,
                  changeOptionLabels,
                  selectedOption,
                  allowSkip
                )
              }
            </View>)
          :
          (
            <ActivityIndicator size="large" color="#0000ff" />
          )
        }
        </View>
      </View>
    );
  }

  imageLayout(questionsLayoutSize, loadedQuestion, theQuestion) {
    let getImageNum = loadedQuestion + 1;
    let getQuestionImg = `https://dev-media.rometic.com/contents/questions/fs/DF${getImageNum}Dating%20Funny.jpg`;

    return (
      <View style={{
        width: questionsLayoutSize.width,
        height: questionsLayoutSize.height
      }}>
        <View style={{
          flex: 1,
          width: questionsLayoutSize.width,
        }}>
          <Image source={{uri: getQuestionImg}} resizeMethod='scale' resizeMode='cover' style={{
            width: questionsLayoutSize.width,
            height: questionsLayoutSize.height
          }} />
        </View>
        <View style={{
          width: questionsLayoutSize.width,
          height: questionsLayoutSize.height * .175,
          backgroundColor: 'rgba(255,255,255,0.4)',
          justifyContent: 'center',
          padding: 5
        }}>
          <Text style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: questionsLayoutSize.height * .038
          }}>{`${theQuestion}`}</Text>
        </View>
      </View>
    );
  }

  questionLayout(questionsLayoutSize, questionsNavSize, loadedQuestion, dataLength, questionChoices, questionChoicesSize, changeOptionLabels, selectedOption, allowSkip) {
    let loadedQuestionLabel = loadedQuestion + 1;
    let dataLengthLabel = dataLength + 1;

    return (
      <View style={{
        width: questionsLayoutSize.width,
        height: questionsLayoutSize.height
      }}>

        <View style={{
          flex: 1,
          width: questionsLayoutSize.width,
        }}>
        {
          Object.entries(questionChoices).map((item, index) => (
            <View key={index} style={{
              backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.5)',
              flex: 1,
              width: questionsLayoutSize.width,
              justifyContent: 'center'
            }} onLayout={(e)=>{
              this.setState({
                questionChoicesSize: e.nativeEvent.layout
              });
            }}>
              <TouchableOpacity style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: selectedOption === item[0] ? 'rgba(255,255,255,0.2)' : 'transparent',
                width: questionChoicesSize.width,
                height: questionChoicesSize.height,
                zIndex: 2
              }} onPress={()=>{
                this.setState({
                  selectedOption: `${item[0]}`,
                });
              }}>
                <View />
              </TouchableOpacity>
              {
                Object.keys(questionChoicesSize).length > 0 ?
                  (
                    <View style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                      <View style={{
                        width: questionChoicesSize.width * .015,
                        height: questionChoicesSize.height,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: selectedOption === item[0] ? 'red' : 'transparent'
                      }}></View>

                      <View style={{
                        justifyContent: 'center',
                        paddingLeft: 10,
                        flex: 1,
                      }}><Text style={{color: '#ffffff'}}>{typeof changeOptionLabels !== 'undefined' ? changeOptionLabels(item[1]) : `${item[1]}`}</Text></View>
                    </View>
                  )
                :
                (<ActivityIndicator size="large" color="#0000ff" />)
              }
            </View>
          ))
        }
        </View>

        <View style={{
          width: questionsLayoutSize.width,
          height: questionsLayoutSize.height * .175,
          backgroundColor: '#000000',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }} onLayout={(e)=>{
          this.setState({
            questionsNavSize: e.nativeEvent.layout
          });
        }}>

          {
            Object.keys(questionsNavSize).length > 0 ?
              <View style={{
                width: questionsLayoutSize.width,
                height: questionsLayoutSize.height * .175,
                backgroundColor: '#000000',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
                <View style={{
                  width: questionsLayoutSize.width * .25,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {
                    loadedQuestion > 0 ?
                      (
                        <TouchableOpacity style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#29b9f2',
                          width: questionsLayoutSize.width * .23,
                          height: questionsLayoutSize.height * .160,
                          borderRadius: 360
                        }} onPress={()=>{
                          this.setState({
                            loadedQuestion: loadedQuestion - 1
                          })
                        }}>
                          <View>
                            <Text style={{
                              fontSize: questionsNavSize.height * .25,
                              fontWeight: 'bold'
                            }}>Back</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    :
                    null
                  }
                </View>

                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{fontSize: questionsNavSize.height * .40, fontWeight: 'bold', color: '#ffffff'}}><Text style={{fontSize: questionsNavSize.height * .65, fontWeight: 'bold', color: '#1aa6ed'}}>{`${loadedQuestionLabel}`} </Text>OF {`${dataLengthLabel}`}</Text>
                </View>

                <View style={{
                  width: questionsLayoutSize.width * .25,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <TouchableOpacity style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: loadedQuestion === dataLength ? '#90e25d' : '#29b9f2',
                    width: questionsLayoutSize.width * .23,
                    height: questionsLayoutSize.height * .160,
                    borderRadius: 360
                  }} onPress={()=>{
                    if(loadedQuestion === dataLength) {
                      this.done();
                    } else {
                      if(allowSkip) {
                        this.setState({
                          loadedQuestion: loadedQuestion + 1,
                          selectedOption: ''
                        });
                      } else {
                        if(selectedOption !== '') {
                          this.setState({
                            loadedQuestion: loadedQuestion + 1,
                            selectedOption: ''
                          });
                        } else {
                          Alert.alert(
                            'Unable to proceed',
                            'Please select an answer before you proceed',
                            [
                              {
                                text: 'Ok',
                                onPress: ()=>{}
                              }
                            ]
                          )
                        }
                      }
                    }
                  }}>
                    <View>
                      <Text style={{
                        fontSize: questionsNavSize.height * .25,
                        fontWeight: 'bold'
                      }}>{loadedQuestion === dataLength ? 'Done' : 'Next'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            :
            null
          }

        </View>
      </View>
    );
  }

  render() {
    const { parentLayoutSize, imageLayoutSize, questionsLayoutSize, questionsNavSize, loadedQuestion, questionChoicesSize, selectedOption } = this.state;
    const { data, lastAnsweredQuestion, changeOptionLabels, allowSkip } = this.props;
    const dataLength = data.length;
    const questionInfo = data[loadedQuestion];

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
      }} onLayout={(e)=>{
        this.setState({
          parentLayoutSize: e.nativeEvent.layout
        });
      }}>
        {
          Object.keys(parentLayoutSize).length > 0 ?
            this.initialLayout(
              parentLayoutSize,
              imageLayoutSize,
              questionsLayoutSize,
              questionsNavSize,
              loadedQuestion,
              dataLength,
              questionInfo,
              questionChoicesSize,
              changeOptionLabels,
              selectedOption,
              allowSkip
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

PersonalityTest.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  lastAnsweredQuestion: PropTypes.number.isRequired,
  whenDone: PropTypes.array.isRequired,
  changeOptionLabels: PropTypes.func,
  allowSkip: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    data: ownProps.data ? ownProps.data : [],
    lastAnsweredQuestion: ownProps.lastAnsweredQuestion ? ownProps.lastAnsweredQuestion : 0,
    whenDone: ownProps.whenDone ? ownProps.whenDone : [],
    changeOptionLabels: ownProps.changeOptionLabels,
    allowSkip: typeof ownProps.allowSkip !== 'undefined' ? ownProps.allowSkip : true
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalityTest);
