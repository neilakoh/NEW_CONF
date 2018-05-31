export default function SelectedTabReducer(state = {tab: "owedToMe"}, action) {
  switch (action.type) {
    case 'SELECTED_TAB':
      return Object.assign({}, state, {tab: action.tab})

    default:
      return state;
  }
}
