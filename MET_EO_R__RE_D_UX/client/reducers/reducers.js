export default function saveName(state = {saveNameRes: ''}, action) {
  switch (action.type) {
    case 'SUCCESS':
      return Object.assign({}, state, {saveNameRes: action.value});

    case 'FAILED':
      return Object.assign({}, state, {saveNameRes: action.value});

    default:
      return state;
  }
}
