export function User(user) {
  return {
    type: 'USER', user
  };
}

export function rxData(data) {
  return {
    type: 'RX_DATA', data
  };
}
