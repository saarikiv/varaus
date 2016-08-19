import {
    PUT_COURSE_INFO,
    REMOVE_COURSE_INFO,
    FLAG_COURSE_INFO_TO_EXIT
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    key: "0",
    closeInfo: false,
    bookings: {
      all: [],
      user: []
    }
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FLAG_COURSE_INFO_TO_EXIT:
            return Object.assign({}, state, {closeInfo: true});
        case PUT_COURSE_INFO:
            return Object.assign({}, state, action.payload);
        case REMOVE_COURSE_INFO:
            return INITIAL_STATE
        default:
            return state;
    }
}
