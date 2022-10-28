import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

function OrdersCard({ order }) {
  return (
    <>
      <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border my-2">
        <h3 className="sr-only">
          Order placed on{" "}
          <time dateTime={order.createdAt}>{order.createdAt}</time>
        </h3>

        <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
          <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
            <div>
              <dt className="font-semibold text-primary-black">Order ID</dt>
              <dd className="mt-1 text-gray-500 truncate">{order.orderId}</dd>
            </div>
            <div className="hidden sm:block">
              <dt className="font-semibold text-primary-black">Date placed</dt>
              <dd className="mt-1 text-gray-500">
                <time dateTime={order.createdAt}>
                  {moment(order.createdAt).format("MMM Do YY")}
                </time>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-primary-black">Total amount</dt>
              <dd className="mt-1 font-medium text-primary-black">
                ₹{order.amount}
              </dd>
            </div>
          </dl>

          <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
            <div className="flex items-center justify-center bg-primary py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-all">
              <Link href={`/account/orders/${order._id}`}>View Order</Link>
              <span className="sr-only">{order.orderId}</span>
            </div>
            <div className="flex items-center justify-center bg-primary py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-all">
              <Link href={"/"}>View Invoice</Link>
              <span className="sr-only">for order {order.orderId}</span>
            </div>
          </div>
        </div>

        {/* Products */}
        <h4 className="sr-only">Items</h4>
        <ul role="list" className="divide-y divide-gray-200">
          {order.products.map((product) => (
            <li key={product._id._id} className="p-4 sm:p-6">
              <div className="flex items-center sm:items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                  <Image
                    src={product._id?.images[0]?.url}
                    alt={product._id?.images[0]?.alt}
                    layout="responsive"
                    width={500}
                    height={500}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="flex-1 ml-6 text-sm">
                  <div className="font-medium text-primary-black sm:flex sm:justify-between">
                    <Link href={`/shop/${product._id?.slug}`}>
                      <h5 className="text-lg font-medium font-Cinzel hover:underline hover:text-primary transition-all">
                        {product._id?.title}
                      </h5>
                    </Link>
                    <p className="mt-2 sm:mt-0">
                      <span className="text-gray-600">Qty: {product.qty}</span>{" "}
                      ₹{product._id?.discPrice}
                    </p>
                  </div>
                  <p className="hidden text-gray-500 sm:block sm:mt-2">
                    {product._id?.shortDesc}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:flex sm:justify-between items-center">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <p className="ml-2 text-sm font-medium text-gray-500">
                    {order.status === "Pending"
                      ? "Order is pending"
                      : order.status === "Shipped"
                      ? "Order is on the way"
                      : order.status === "Complete"
                      ? "Order is delivered"
                      : order.status === "cancelled"
                      ? "Order was Cancelled"
                      : order.status === "Return"
                      ? "Order Return"
                      : "No Info"}
                  </p>
                </div>

                {/* <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                            <div className="flex-1 flex justify-center">
                              <a
                                href={`/shop/${product._id?.slug}`}
                                className="text-primary whitespace-nowrap hover:text-primary-dark"
                              >
                                View product
                              </a>
                            </div>
                            <div className="flex-1 pl-4 flex justify-center">
                              <a href="#" className="text-primary whitespace-nowrap hover:text-primary-dark">
                                Buy again
                              </a>
                            </div>
                          </div> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OrdersCard;
