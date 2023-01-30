import React from "react";

const ShimmerProductCard = () => {
  return (
    <div className="w-[300px] h-fit px-2 py-4 xl:px-4 xl:py-6">
      <div className="bg-gray-300 w-full h-[230px] rounded-md animate-pulse"></div>
      <div className="mt-2">
        <div className="w-full h-4 bg-gray-300 rounded-md my-1 animate-pulse"></div>
        <div className="w-full h-4 bg-gray-300 rounded-md my-1 animate-pulse"></div>
        <div className="flex gap-2">
          <div className="w-8 h-3 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-8 h-3 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerProductCard;
