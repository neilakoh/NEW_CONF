export default function SelectedTabReducer(state = {open: false}, action) {
  switch (action.type) {
    case 'OPEN_ADD_OWE_MODAL':
      return Object.assign({}, state, {open: action.value})

    default:
      return state;
  }
}
