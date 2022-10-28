import React from "react";
import ProductCard from "../card/ProductCard";
import { motion } from "framer-motion";

function TrendingSection({ products }) {
  const stargar = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  products?.products.sort((a, b) =>
    new Date(a.createdAt) < new Date(b.createdAt)
      ? 1
      : -1 && a.rating < b.rating
      ? 1
      : -1
  );

  return (
    <div className="px-4 pt-6 pb-14 text-center">
      <div className="bg-gradient-to-b from-primary-white to-[#eddfb34f] px-2 rounded-b-2xl">
        <h2 className="text-5xl font-BrownSugar font-normal text-primary">
          Trendind Products
        </h2>
        <p>Explore some product types which provide.</p>
        <div className="mt-4 flex items-center gap-3 justify-center">
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
        <div className="grid grid-cols-2 xl:grid-cols-4 mx-4 xl:mx-12 mt-4 items-center justify-center transition-all">
          {products?.products.map((listData) => (
            <React.Fragment key={listData._id}>
              <motion.div variants={stargar}>
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                >
                  <ProductCard allData={listData} />
                </motion.div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingSection;
