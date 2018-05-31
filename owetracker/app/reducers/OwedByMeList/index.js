export default function OwedByMeList(state = {list: {}}, action) {
  switch (action.type) {
    case 'OWED_BY_ME_LIST':
      return Object.assign({}, {list: action.list})

    default:
      return state;
  }
}
