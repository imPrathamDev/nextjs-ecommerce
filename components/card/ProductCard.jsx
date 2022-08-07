import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import { CartState } from '../../context/Context'


function ProductCard({ allData }) {
  const { state: { cartItems }, dispatch } = CartState();
  const [cartData, setCartData] = React.useState([]);
  React.useEffect(() => {
    setCartData(cartItems);
  }, [cartItems])

  return (
    <div className="w-fit px-2 py-4 xl:px-4 xl:py-6 block xl:text-left text-center group cursor-pointer transition-all transform hover:scale-105">
      <div className="">
        <Image src={allData?.images?.[0]?.url} className="object-cover rounded-md" width={'250px'} height={'230px'} />
      </div>
      <div className="mt-2">
        <h5 className="text-primary-black font-Cinzel font-medium transition-all hover:text-primary hover:underline">
        <Link href={`http://localhost:3000/shop/${allData?.slug}`}>{allData.title}</Link>
        </h5>

        <p className="text-sm text-gray-700">
          <small className='text-xs'>₹</small>
          {allData.discPrice}
        </p>
      </div>
      <div className='mt-1 opacity-0 transform translate-y-14 transition group-hover:opacity-100 group-hover:translate-y-0 duration-300'>
        {cartData.some(p => p._id === allData._id) ? (
          <button className='text-base font-Cinzel text-primary-dark font-bold' onClick={() => dispatch({
            type: 'REMOVE_FROM_CART',
            payload: allData
          })}>
            Remove From Cart
          </button>
        ) : (
          <button className='text-base font-Cinzel text-primary-dark font-bold' onClick={() => dispatch({
            type: 'ADD_TO_CART',
            payload: allData
          })}>
            Add to Cart
          </button>)}
      </div>
    </div>
  )
}

export default ProductCard
