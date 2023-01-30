import Image from "next/image";
import Link from "next/link";

const ProductsList = ({ products, cartData, dispatch }) => {
  return (
    <ul className="h-fit max-h-96  divide-y overflow-y-auto custom-scrollbar px-2">
      {products.length > 0 &&
        cartData.map((product) => (
          <li key={product._id} className="flex py-4 group">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={
                  products.filter((p) => p._id === product._id)?.[0]
                    ?.images?.[0]?.url
                }
                alt={products.filter((p) => p._id === product._id)?.[0]?.title}
                className="h-full w-full object-cover object-center transform transition-all group-hover:scale-110"
                width={"100%"}
                height={"100%"}
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-primary-black">
                  <h3 className="font-Cinzel font-medium group-hover:underline">
                    <Link
                      href={`/shop/${
                        products.filter((p) => p._id === product._id)?.[0]?.slug
                      }`}
                    >
                      <a>
                        {
                          products.filter((p) => p._id === product._id)?.[0]
                            ?.title
                        }
                      </a>
                    </Link>
                  </h3>
                  <p className="ml-4">
                    ₹
                    {
                      products.filter((p) => p._id === product._id)?.[0]
                        ?.discPrice
                    }
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {products.filter((p) => p._id === product._id)?.[0]?.category}
                </p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "CHANGE_QTY",
                        payload: {
                          _id: product._id,
                          qty: product.qty === 1 ? 1 : product.qty - 1,
                        },
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  <p className="">Qty {product.qty}</p>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "CHANGE_QTY",
                        payload: {
                          _id: product._id,
                          qty:
                            product.qty >=
                            products.filter((p) => p._id === product._id)?.[0]
                              ?.availableQty
                              ? products.filter(
                                  (p) => p._id === product._id
                                )?.[0]?.availableQty
                              : product.qty + 1,
                        },
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-primary-semi-light hover:text-primary-light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: product,
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ProductsList;
