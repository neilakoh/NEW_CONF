export default function ViewListDetails(state = {data: {
  open: false,
  payload: {}
}}, action) {
  switch (action.type) {
    case 'VIEW_LIST_DETAILS':
      return Object.assign({}, state, {data: action.value})

    default:
      return state;
  }
}
