import { 
  FETCH_SPECIAL_COURSES_BANNER, 
  FETCH_SPECIAL_COURSES_BOOKINGS, 
  ADD_USER_TO_SC_BOOKINGS } 
from '../actions/actionTypes.js'

const INITIAL_STATE = {
  fetchReady: false,
  banner: [],
  bookings: {},
  bookingsReady: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_USER_TO_SC_BOOKINGS:
      let newBookings = Object.assign(state.bookings)
      if(newBookings[action.payload.key].userList){
        newBookings[action.payload.key].userList = newBookings[action.payload.key].userList.concat(action.payload.user)
      } else {
        newBookings[action.payload.key].userList = Object.assign([]);
        newBookings[action.payload.key].userList = newBookings[action.payload.key].userList.concat(action.payload.user)
      }
      return Object.assign({}, state, {bookings: newBookings})      
    case FETCH_SPECIAL_COURSES_BOOKINGS:
      return Object.assign({}, state, action.payload)
    case FETCH_SPECIAL_COURSES_BANNER:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
