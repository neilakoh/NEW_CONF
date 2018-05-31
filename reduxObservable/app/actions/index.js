export const TEST_REDUCERS = 'TEST_REDUCERS';

export function TestAction(data) {
  return {
      type: 'TEST_REDUCERS',
      payload: data,
  };
}

export function endAction(data) {
  return {
      type: 'END_REDUCERS',
      payload: data,
  };
}
  