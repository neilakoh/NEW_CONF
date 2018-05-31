export default function User(state = {}, action) {
  switch (action.type) {
    case 'USER':
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
}
