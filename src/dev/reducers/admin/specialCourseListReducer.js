import {
    FETCH_SPECIAL_COURSE_LIST,
    EXPAND_SPECIAL_COURSE_LIST,
    MINIMIZE_SPECIAL_COURSE_LIST
} from '../../actions/actionTypes.js'

const INITIAL_STATE = {
    expanded: false,
    list: []
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_SPECIAL_COURSE_LIST:
            return Object.assign({}, state, action.payload)
        case EXPAND_SPECIAL_COURSE_LIST:
            return Object.assign({}, state, {
                expanded: true
            })
        case MINIMIZE_SPECIAL_COURSE_LIST:
            return Object.assign({}, state, {
                expanded: false
            })
        default:
            return state
    }
}