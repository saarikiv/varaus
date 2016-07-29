import {
    START_CHECKOUT_FLOW,
    FETCH_SHOP_ITEMS,
    ADD_TO_CART,
    GET_CLIENT_TOKEN,
    DO_PURCHASE_TRANSACTION,
    CHECKOUT_ERROR,
    CHECKOUT_TIMEOUT,
    BUY_WITH_CASH,
    EXECUTE_CASH_PURCHASE
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    cart: {},
    error: {
        code: "0",
        message: "no error"
    },
    items: [],
    token: "",
    purchaseResult: {},
    phase: "start"
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case BUY_WITH_CASH:
            return Object.assign({}, state, action.payload);
        case EXECUTE_CASH_PURCHASE:
            return Object.assign({}, state, action.payload);
        case START_CHECKOUT_FLOW:
            return Object.assign({}, state, action.payload);
        case CHECKOUT_TIMEOUT:
            return Object.assign({}, state, action.payload);
        case FETCH_SHOP_ITEMS:
            return Object.assign({}, state, action.payload);
        case ADD_TO_CART:
            return Object.assign({}, state, action.payload);
        case GET_CLIENT_TOKEN:
            return Object.assign({}, state, action.payload);
        case DO_PURCHASE_TRANSACTION:
            return Object.assign({}, state, action.payload);
        case CHECKOUT_ERROR:
            return Object.assign({}, state, action.payload, {
                phase: "error"
            });
        default:
            return state
    }
}