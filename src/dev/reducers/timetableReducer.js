import { FETCH_TIMETABLE, FETCH_COURSE_BOOKINGS } from '../actions/actionTypes.js'

const INITIAL_STATE = {
  courses: [],
  bookings: {}
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COURSE_BOOKINGS:
        var bookings = Object.assign({},state.bookings, action.payload)
        return Object.assign({}, state, {bookings: bookings});
    case FETCH_TIMETABLE:
      return Object.assign({}, state, action.payload);
    default:
      return state
  }
}
