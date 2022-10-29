import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CartState } from "../../context/Context";

function ProductCard({ allData }) {
  const {
    state: { cartItems },
    dispatch,
  } = CartState();
  const [cartData, setCartData] = React.useState([]);
  React.useEffect(() => {
    setCartData(cartItems);
  }, [cartItems]);

  return (
    <div className="w-fit px-2 py-4 xl:px-4 xl:py-6 block xl:text-left text-center group cursor-pointer transition-all transform hover:scale-105">
      <div className="">
        <Image
          src={allData?.images?.[0]?.url}
          blurDataURL={allData?.images?.[0]?.url}
          placeholder="blur"
          className="object-cover rounded-md"
          width={250}
          height={230}
        />
      </div>
      <div className="mt-2">
        <Link href={`/shop/${allData?.slug}`}>
          <a>
            <h5 className="text-primary-black font-Cinzel font-medium transition-all hover:text-primary hover:underline">
              {allData.title}
            </h5>
          </a>
        </Link>
        <div className="text-sm font-medium flex items-center justify-center xl:justify-start lg:justify-start gap-1 text-gray-700">
          <p>
            <small className="text-xs">₹</small>
            {allData.discPrice}
          </p>
          <p className="text-xs line-through">₹{allData.price}</p>
        </div>
      </div>
      <div className="mt-1 transition opacity-0 transform translate-y-14 group-hover:opacity-100 group-hover:translate-y-0 duration-300">
        {allData?.availableQty > 0 ? (
          <>
            {cartData.some((p) => p._id === allData._id) ? (
              <button
                className="text-base font-Cinzel text-primary-dark font-bold"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: allData,
                  })
                }
              >
                Remove From Cart
              </button>
            ) : (
              <button
                className="text-base font-Cinzel text-primary-dark font-bold"
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: allData,
                  })
                }
              >
                Add to Cart
              </button>
            )}
          </>
        ) : (
          <>
            <span className="text-base font-Cinzel text-red-500 font-bold">
              Out Of Stock
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
