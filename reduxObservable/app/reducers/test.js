export default function TestReducer(state = {test: ''}, action) {
    switch (action.type) {
      case 'TEST_REDUCERS':
      return state;

      case 'END_REDUCERS':
      console.log(action)
        return state;
  
      default:
        return state;
    }
  }
  