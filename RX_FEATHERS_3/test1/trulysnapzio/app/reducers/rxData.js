export default function RxData(state = {data: ''}, action) {
  switch (action.type) {
    case 'RX_DATA':
      return Object.assign({}, state, action.data);

    default:
      return state;
  }
}
