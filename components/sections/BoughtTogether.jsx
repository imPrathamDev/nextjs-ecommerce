import React from "react";
import ProductCard from "../card/ProductCard";
import { CartState } from "../../context/Context";

function BoughtTogether({ product }) {
  const { dispatch } = CartState();
  return (
    <div className="my-6 p-4 rounded-md bg-white">
      <h3 className="text-2xl font-medium font-Cinzel text-primary-black">
        Frequently Bought Together
      </h3>
      <div className="my-4 grid grid-cols-1 lg:grid-cols-3 lg:justify-center items-center gap-0.5">
        {product.map((item) => (
          <React.Fragment key={item?._id?._id}>
            <ProductCard allData={item?._id} />
          </React.Fragment>
        ))}
      </div>
      <div className="text-center">
        <p className="text-lg text-primary-black font-medium font-Cinzel">
          Total ₹{product.reduce((acc, curr) => acc + curr?._id?.discPrice, 0)}{" "}
          <span className="text-base line-through">
            ₹{product.reduce((acc, curr) => acc + curr?._id?.price, 0)}
          </span>
        </p>
        <button
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART_BULK",
              payload: product,
            })
          }
          className="relative mx-auto my-2 inline-block group cursor-pointer"
        >
          <span className="absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
            ADD ALL TO CART
          </span>
        </button>
      </div>
    </div>
  );
}

export default BoughtTogether;
