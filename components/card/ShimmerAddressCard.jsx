import React from "react";

const ShimmerAddressCard = () => {
  return (
    <div className="w-full bg-white rounded-md shadow px-4 py-5">
      <div className="w-40 h-6 bg-gray-300 rounded-md animate-pulse my-2"></div>
      <div className="w-3/4 h-4 bg-gray-300 rounded-md animate-pulse my-1"></div>
      <div className="w-2/4 h-4 bg-gray-300 rounded-md animate-pulse my-1"></div>
      <div className="w-52 h-5 bg-gray-300 rounded-md animate-pulse my-2"></div>
    </div>
  );
};

export default ShimmerAddressCard;
