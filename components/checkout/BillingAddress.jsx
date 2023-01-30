import { motion } from "framer-motion";

const BillingAddress = ({ billingData, handlerChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.2 }}
      transition={{ duration: 0.5 }}
      className="my-4"
    >
      <h4 className="font-medium text-lg">Billing information</h4>
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          name="billingFirstName"
          id="billingFirstName"
          placeholder="First Name"
          value={billingData?.firstName}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <input
          type="text"
          name="billingLastName"
          id="billingLastName"
          placeholder="Last Name"
          value={billingData?.lastName}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <input
        type="text"
        name="billingAddress"
        id="billingAddress"
        placeholder="Billing Address"
        value={billingData?.address}
        onChange={handlerChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
      />
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="billingCity"
          id="billingCity"
          placeholder="Billing City"
          value={billingData?.city}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <input
          type="text"
          name="billingState"
          id="billingState"
          placeholder="Billing State"
          value={billingData?.state}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <input
          type="number"
          name="billingPincode"
          id="billingPincode"
          placeholder="Billing Pincode"
          value={billingData?.pincode}
          onChange={handlerChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
    </motion.div>
  );
};

export default BillingAddress;
