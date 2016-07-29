import { FETCH_INSTRUCTOR_LIST, EXPAND_INSTRUCTOR_LIST, MINIMIZE_INSTRUCTOR_LIST } from '../../actions/actionTypes.js'

const INITIAL_STATE = {expanded: false, list: []}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_INSTRUCTOR_LIST:
      return Object.assign({}, state, {list: action.payload})
    case EXPAND_INSTRUCTOR_LIST:
      return Object.assign({}, state, {expanded: true})
    case MINIMIZE_INSTRUCTOR_LIST:
      return Object.assign({}, state, {expanded: false})
    default:
      return state
  }
}
