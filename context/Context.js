import Cookies from 'js-cookie';
import React, { createContext, useContext, useReducer } from 'react'

import { cartReducer } from './Reducers';

const Cart = createContext();

function Context({ children }) {

  const isSERVER = typeof window === 'undefined';

  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: isSERVER ? [] : Cookies.get('cartItemsData') ? JSON.parse(Cookies.get('cartItemsData')) : [],
  })

  return (
    <Cart.Provider value={
      {
        state,
        dispatch
      }
    }>
      {children}
    </Cart.Provider>
  )
}

export default Context;

export const CartState = () => {
  return useContext(Cart);
}

