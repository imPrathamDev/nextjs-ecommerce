import Cookies from "js-cookie";
export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            Cookies.set('cartItemsData', JSON.stringify([...state.cartItems, {_id: action.payload._id, qty: 1 }]))
            return {...state, cartItems: [...state.cartItems, {_id: action.payload._id, qty: 1 }]};
        case "REMOVE_FROM_CART":
            Cookies.set('cartItemsData', JSON.stringify(state.cartItems.filter(c => c._id !== action.payload._id)))
            return {...state, cartItems: state.cartItems.filter(c => c._id !== action.payload._id)};
        case "CHANGE_QTY":
            Cookies.set('cartItemsData', JSON.stringify(state.cartItems.filter(c => c._id === action.payload._id ? c.qty = action.payload.qty : c.qty)))
            return {...state, cartItems: state.cartItems.filter(c => c._id === action.payload._id ? c.qty = action.payload.qty : c.qty)};
        case "CLEAR_CART":
            Cookies.set('cartItemsData', JSON.stringify([]));
            return {...state, cartItems: action.payload};
        default:
            return state;
    }
};