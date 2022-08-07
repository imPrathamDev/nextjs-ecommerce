import React from 'react'
import ProductCard from '../card/ProductCard'

function WishLists({ products }) {
  return (
    <div className='grid grid-cols-2 xl:grid-cols-4 gap-2 items-center justify-center text-center'>
      {products.map(product => 
        <React.Fragment key={product._id}>
            <ProductCard allData={product.productId} />
        </React.Fragment>
        )}
    </div>
  )
}

export default WishLists
