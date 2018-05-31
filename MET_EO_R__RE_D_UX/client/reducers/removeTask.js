export default function removeTask(state = {}, action) {
  switch (action.type) {
    case 'REMOVE_TASK_SUCCESS':
      return Object.assign({}, state, action.value);

    case 'REMOVE_TASK_FAILED':
      return Object.assign({}, state, action.value);

    default:
      return state;
  }
}
