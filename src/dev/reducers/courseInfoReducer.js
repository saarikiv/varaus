import {
    PUT_COURSE_INFO,
    REMOVE_COURSE_INFO
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    key: "0",
    bookings: {
      all: [],
      user: []
    }
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PUT_COURSE_INFO:
            return Object.assign({}, state, action.payload);
        case REMOVE_COURSE_INFO:
            return INITIAL_STATE
        default:
            return state;
    }
}
