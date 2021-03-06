export default function AddOweFormReducer(state = {ids: []}, action) {
  switch (action.type) {
    case 'ID_COLLECTION':
      return Object.assign({}, state, {ids: action.id})

    default:
      return state;
  }
}
