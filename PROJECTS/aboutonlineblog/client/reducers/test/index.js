export default function saveTask(state = {}, action) {
  switch (action.type) {
    case 'SAVE_TASK_SUCCESS':
      return Object.assign({}, state, action.value);

    case 'SAVE_TASK_FAILED':
      return Object.assign({}, state, action.value);

    default:
      return state;
  }
}
