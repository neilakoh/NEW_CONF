export default function OwedToMeList(state = {list: {}}, action) {
  switch (action.type) {
    case 'OWED_TO_ME_LIST':
      return Object.assign({}, {list: action.list})

    default:
      return state;
  }
}
