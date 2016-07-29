import {
    FETCH_COURSE_TYPE_LIST,
    EXPAND_COURSE_TYPE_LIST,
    MINIMIZE_COURSE_TYPE_LIST
} from '../../actions/actionTypes.js'

const INITIAL_STATE = {
    expanded: false,
    list: []
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_COURSE_TYPE_LIST:
            return Object.assign({}, state, action.payload)
        case EXPAND_COURSE_TYPE_LIST:
            return Object.assign({}, state, {
                expanded: true
            })
        case MINIMIZE_COURSE_TYPE_LIST:
            return Object.assign({}, state, {
                expanded: false
            })
        default:
            return state
    }
}