export default function AddOweFormReducer(state = {formField: ""}, action) {
  switch (action.type) {
    case 'ADD_OWE_FORM':
      return Object.assign({}, state, {formField: action.form})

    default:
      return state;
  }
}
