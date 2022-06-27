import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import placeholder from '../public/placeholder.webp'

import { cartReducer } from './Reducers';

const Cart = createContext();

function Context({ children }) {

    const data = [
        {
          id: 1,
          title: 'Anushka Sharma Classic Silver Zircon Set',
          price: 599,
          quty: 1,
          img: placeholder,
          stock: 7,
        },
        {
          id: 2,
          title: 'Silver Infinity Heart Necklace',
          price: 699,
          quty: 1,
          img: placeholder,
          stock: 4,
        },
        {
          id: 3, 
          title: 'Anushka Sharma Silver Vintage Couple Band',
          price: 899,
          quty: 1,
          img: placeholder,
          stock: 75,
        },
        {
          id: 4,
          title: 'Anushka Sharma Silver Blooming Flower Necklace',
          price: 399,
          quty: 1,
          img: placeholder,
          stock: 45,
        },
      ]


const isSERVER = typeof window === 'undefined';

const [state, dispatch] = useReducer(cartReducer, {
    products: data,
    cartItems: isSERVER ? [] : Cookies.get('cartItemsData') ? JSON.parse(Cookies.get('cartItemsData')) : [], 
})

  return (
    <Cart.Provider value={
        {
            state,
            dispatch
        }
    }>
        { children }
    </Cart.Provider>
  )
}

export default Context;

export const CartState = () => {
    return useContext(Cart);
}

