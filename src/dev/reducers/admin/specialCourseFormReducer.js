import { EXPAND_SPECIAL_COURSE_FORM, MINIMIZE_SPECIAL_COURSE_FORM } from '../../actions/actionTypes.js'

const INITIAL_STATE = {
    expanded: false,
    expander: ""
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_SPECIAL_COURSE_FORM:
      return Object.assign({}, state, action.payload)
    case MINIMIZE_SPECIAL_COURSE_FORM:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}