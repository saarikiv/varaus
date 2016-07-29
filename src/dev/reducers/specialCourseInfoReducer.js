import {
    PUT_SPECIAL_COURSE_INFO,
    REMOVE_SPECIAL_COURSE_INFO,
} from '../actions/actionTypes.js'

const INITIAL_STATE = { info: null }

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PUT_SPECIAL_COURSE_INFO:
            return Object.assign({}, state, { info: action.payload });
        case REMOVE_SPECIAL_COURSE_INFO:
            return Object.assign({}, state, { info: null });
        default:
            return state;
    }
}