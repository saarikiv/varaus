import {
    FETCH_PLACE_LIST,
    EXPAND_PLACE_LIST,
    MINIMIZE_PLACE_LIST
} from '../../actions/actionTypes.js'

const INITIAL_STATE = {
    expanded: false,
    list: []
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PLACE_LIST:
            return Object.assign({}, state, action.payload)
        case EXPAND_PLACE_LIST:
            return Object.assign({}, state, {
                expanded: true
            })
        case MINIMIZE_PLACE_LIST:
            return Object.assign({}, state, {
                expanded: false
            })
        default:
            return state
    }
}