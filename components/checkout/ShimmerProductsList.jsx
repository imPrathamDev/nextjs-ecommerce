import React from "react";

const ShimmerProductsList = () => {
  return (
    <div className="w-full flex gap-x-2 py-2 px-1">
      <div className="bg-gray-300 h-24 w-24 rounded-md animate-pulse"></div>
      <div className="flex flex-col gap-1 flex-1">
        <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-1/3 h-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-20 h-3 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="flex gap-1 mt-auto mb-auto">
          <div className="w-14 h-5 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-14 h-5 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerProductsList;
