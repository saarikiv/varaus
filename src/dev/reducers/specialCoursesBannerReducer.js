import { FETCH_SPECIAL_COURSES_BANNER, FETCH_SPECIAL_COURSES_BOOKINGS } from '../actions/actionTypes.js'

const INITIAL_STATE = {
  banner: [],
  bookings: {},
  bookingsReady: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SPECIAL_COURSES_BOOKINGS:
      return Object.assign({}, state, action.payload)
    case FETCH_SPECIAL_COURSES_BANNER:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
