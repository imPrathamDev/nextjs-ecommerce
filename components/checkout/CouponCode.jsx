import React from "react";

const CouponCode = ({ coupon, handlerCoupon, handlerChange }) => {
  return (
    <div
      id="counpoContainer"
      className="flex items-center px-2 py-1 border-2 border-primary-semi-light"
    >
      <input
        type="text"
        id="coupon"
        name="coupon"
        value={coupon?.code.toUpperCase()}
        onChange={handlerChange}
        className="peer/input block py-2 px-0 w-full font-medium text-primary-black bg-transparent appearance-none focus:outline-none focus:ring-0 placeholder:text-gray-600 placeholder:font-medium"
        placeholder="Coupon Code"
      />
      <button
        onClick={handlerCoupon}
        className="font-Cinzel font-semibold text-lg text-primary hover:underline transition-all"
      >
        Apply
      </button>
    </div>
  );
};

export default CouponCode;
