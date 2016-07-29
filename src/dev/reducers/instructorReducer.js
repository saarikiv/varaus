import {
    FETCH_INSTRUCTOR_DATA,
    INSTRUCTOR_ERROR
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    visible: false,
    course: {},
    booking: [],
    error: {
        code: "OK",
        message: "No error"
    }
}

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case FETCH_INSTRUCTOR_DATA:
            return Object.assign({}, state, action.payload);
        case INSTRUCTOR_ERROR:
            console.error("INSTRUCTOR_ERROR: ", action.payload)
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}