import React from 'react';
import ProductCard from '../card/ProductCard';

function TrendingSection({ products }) {

  return (
    <div className='px-4 pt-6 pb-14 text-center'>
      <div className='bg-gradient-to-b from-primary-white to-[#eddfb34f] px-2 rounded-b-2xl'>
      <h2 className='text-4xl font-Cinzel font-semibold text-primary-dark'>Trendind Products</h2>
      <p>Explore some product types which provide.</p>
      <div className='mt-4 flex items-center gap-3 justify-center'>
        {/* <button className='p-2 text-sm text-black bg-primary-semi-light transition-all transform hover:scale-[1.05]'>
            Best Seller
        </button>
        <button className='p-2 text-sm text-black bg-primary-semi-light transition-all transform hover:scale-[1.05]'>
            Featured
        </button>
        <button className='p-2 text-sm text-black bg-primary-semi-light transition-all transform hover:scale-[1.05]'>
            New Arrival
        </button> */}
      </div>
      <div className='grid grid-cols-2 xl:grid-cols-4 mx-4 xl:mx-12 mt-4 items-center justify-center'>
          {products?.products.map((listData) =>(
            <React.Fragment key={listData._id}>
                 <ProductCard allData={listData} />
            </React.Fragment>
          ))}
      </div>
      </div>
    </div>
  )
}

export default TrendingSection;
