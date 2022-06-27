export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {...state, cartItems: [...state.cartItems, {...action.payload, qty: 1 }]};
        case "REMOVE_FROM_CART":
            return {...state, cartItems: state.cartItems.filter(c => c.id !== action.payload.id)};
        case "CHANGE_QTY":
            return {...state, cartItems: state.cartItems.filter(c => c.id === action.payload.id?c.qty=action.payload.qty:c.qty)}
        default:
            return state;
    }
};