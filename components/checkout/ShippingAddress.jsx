import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Countries } from "../../static/staticData";

const ShippingAddress = ({
  handlerChange,
  shippingData,
  setSelectedAddress,
  selectedAddress,
  userAddress,
  setCountry,
  country,
}) => {
  return (
    <>
      <Listbox value={selectedAddress} onChange={setSelectedAddress}>
        <div className="relative mt-1">
          <Listbox.Button className="relative flex items-center text-left w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40">
            <div className="flex flex-col">
              <span className="text-xs -mb-1">Saved Address</span>
              <span className="text-base truncate">
                {selectedAddress.data
                  ? selectedAddress?.address
                  : "Use a new address"}
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-auto h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 shadow-lg w-full border border-primary-black bg-white">
              {userAddress
                ? userAddress.map((option, key) => (
                    <Listbox.Option
                      key={key}
                      value={option}
                      className={({ active }) =>
                        `relative mt-1 w-full overflow-auto bg-white text-sm font-medium cursor-pointer ${
                          active ? "bg-primary-light" : "bg-white"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate p-1 ${
                              selected
                                ? "font-semibold bg-primary-light"
                                : "font-medium"
                            }`}
                          >
                            <span className="">
                              {option?.firstName} {option?.lastName}
                            </span>
                            <p className="">{option?.address}</p>
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))
                : null}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <Listbox value={country} onChange={setCountry}>
        <Listbox.Button className="flex items-center text-left w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40">
          <div className="flex flex-col">
            <span className="text-xs -mb-1">Select Country</span>
            <span className="text-base">
              {country.name}(Currently Only {country.name} is Available)
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-auto h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="mt-1 p-1 z-10 border border-primary-black max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-primary-black ring-opacity-5 focus:outline-none sm:text-sm">
            {Countries.map((option, key) => (
              <Listbox.Option
                key={key}
                value={option}
                className={({ active }) =>
                  `bg-white text-sm font-medium transition-all ${
                    active ? "bg-primary-light" : "bg-white"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate p-1 ${
                        selected
                          ? "font-semibold bg-primary-light"
                          : "font-medium"
                      }`}
                    >
                      {option.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="First Name"
          value={shippingData?.firstName}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Last Name"
          value={shippingData?.lastName}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <input
        type="text"
        name="address"
        id="address"
        placeholder="Address"
        value={shippingData?.address}
        onChange={handlerChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
      />
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={shippingData?.city}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <input
          type="text"
          name="state"
          id="state"
          placeholder="State"
          value={shippingData?.state}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <input
          type="number"
          name="pincode"
          id="pincode"
          placeholder="Pincode"
          value={shippingData?.pincode}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <input
        type="number"
        name="phone"
        id="phone"
        placeholder="Phone"
        value={shippingData?.phone}
        onChange={handlerChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
      />
    </>
  );
};

export default ShippingAddress;
