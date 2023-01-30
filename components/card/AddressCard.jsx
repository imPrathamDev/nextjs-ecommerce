import React from "react";

const AddressCard = ({ address, setData, setNewAddress, handlerDelete }) => {
  return (
    <div
      key={address?._id}
      className="text-base leading-6 bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border my-2 p-4"
    >
      <div className="">
        <h4 className="text-lg font-semibold text-primary-black">
          {address?.firstName} {address?.lastName}
        </h4>
        <p>{address?.address}</p>
        <p>
          {address?.city} ({address?.pincode}), {address?.state},{" "}
          {address?.country}
        </p>
        {address.phone && <p>Phone: {address?.phone}</p>}
      </div>
      <div className="w-full flex items-center justify-end gap-2 -mt-4 -mb-2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setData((prevData) => ({
              ...prevData,
              isOpen: true,
              action: "UPDATE_ADDRESS",
              addressId: address?._id,
            }));
            setNewAddress({
              firstName: address?.firstName,
              lastName: address?.lastName,
              address: address?.address,
              city: address?.city,
              state: address?.state,
              pincode: address?.pincode,
              phone: address?.phone,
            });
          }}
          className="h-6 w-6 hover:text-primary transition-all transform hover:scale-110 hover:rotate-12 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handlerDelete(address?._id)}
          className="h-6 w-6 hover:text-red-500 transition-all transform hover:scale-110 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  );
};

export default AddressCard;
