import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CartState } from "../../context/Context";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import { signOut, getSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import party from "party-js";
import { motion } from "framer-motion";
import Layouts from "../../components/layouts/Layouts";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { user } = session;
  const respone = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/getProducts`
  );
  const allProducts = await respone.json();

  const getAddress = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/address/getAddress`,
    {
      method: "POST",
      body: JSON.stringify({
        userId: user?._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((respone) => respone.json());
  return {
    props: {
      allProducts: allProducts.products,
      user,
      userAddress: getAddress.success ? getAddress?.address : [],
    },
  };
}

const Countries = [
  {
    name: "India",
  },
];

function Checkout({ allProducts, user, userAddress }) {
  const router = useRouter();
  const [cartData, setCartData] = React.useState([]);
  const [selectedAddress, setSelectedAddress] = React.useState(userAddress[0]);
  const {
    state: { cartItems },
    dispatch,
  } = CartState();
  const [subtotal, setSubtotal] = React.useState(0);
  const [shippingPrice, setShippingPrice] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [isChecked, setIsChecked] = React.useState(false);
  const [country, setCountry] = React.useState(Countries[0]);
  const [isBillingAddress, setIsBillingAddress] = React.useState(true);
  const [coupon, setCoupon] = React.useState({
    code: "",
    isDiscounted: false,
    calDiscount: 0,
  });

  const [shippingData, setShippingData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [billingData, setBillingData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  React.useEffect(() => {
    setCartData(cartItems);
    setSubtotal(
      cartItems.reduce(
        (acc, curr) =>
          acc +
          allProducts.filter((p) => p._id === curr._id)?.[0]?.discPrice *
            curr.qty,
        0
      )
    );
    setTotal(
      isChecked
        ? subtotal - coupon?.calDiscount + shippingPrice + 50
        : subtotal - coupon?.calDiscount + shippingPrice
    );
    if (!cartItems.length > 0) {
      router.push("/");
      toast.warning("Empty Cart", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [cartItems, subtotal, total, shippingPrice, coupon]);

  React.useEffect(() => {
    if (userAddress.length > 0) {
      setShippingData(selectedAddress);
    }
  }, [selectedAddress]);

  const handleChange = (e) => {
    if (e.target.name === "giftCheck") {
      if (e.target.checked) {
        setIsChecked(true);
        setTotal(50 + total);
      } else {
        setIsChecked(false);
        setTotal(total - 50);
      }
    } else if (e.target.name === "billingAddress") {
      if (e.target.checked) {
        setIsBillingAddress(true);
      } else {
        setIsBillingAddress(false);
      }
    }
  };

  const validatePhone = (phone) => {
    const number = /^([\+0]91)?\-?[7-9]{1}[0-9]{9}$/;
    const check = number.test(phone);
    return check;
  };

  const initiatePayment = async () => {
    toast.info(`Please wait ${user?.name.toLowerCase()}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const fullBillingAddress = {
      firstName: billingData?.firstName,
      lastName: billingData?.lastName,
      address: billingData?.address,
      city: billingData?.city,
      state: billingData?.state,
      pincode: billingData?.pincode,
      country: country.name,
    };
    const fullAddress = {
      firstName: shippingData?.firstName,
      lastName: shippingData?.lastName,
      address: shippingData?.address,
      state: shippingData?.state,
      city: shippingData?.city,
      pincode: shippingData?.pincode,
      country: country.name,
    };
    const orderResponse = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/payments/preTranscation`,
      {
        method: "POST",
        body: JSON.stringify({
          total,
          userEmail: user?.email,
          userId: user?._id,
          giftWrap: isChecked,
          products: cartData,
          address: fullAddress,
          phone: shippingData?.phone,
          billingAddress: isBillingAddress ? fullAddress : fullBillingAddress,
          isDiscountCode: coupon?.isDiscounted,
          discountCodeId: coupon?.codeId,
          discount: coupon?.calDiscount,
          couponCode: coupon?.code,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const orderJSON = await orderResponse.json();
    let options;
    if (!orderJSON.success) {
      toast.error(orderJSON.error, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderJSON.amount,
        currency: orderJSON.currency,
        name: "Compamy Name",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderJSON.id,
        callback_url: process.env.NEXT_PUBLIC_CALLBACK_URL,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: shippingData?.phone,
        },
        notes: {
          address: "ggg",
        },
        theme: {
          color: "#B09B71",
        },
      };
      let initPay = new Razorpay(options);
      initPay.open();
    }
  };

  const handlerChange = (e) => {
    if (e.target.name === "firstname") {
      setShippingData((prevData) => ({
        ...prevData,
        firstName: e.target.value,
      }));
    } else if (e.target.name === "lastname") {
      setShippingData((prevData) => ({
        ...prevData,
        lastName: e.target.value,
      }));
    } else if (e.target.name === "city") {
      setShippingData((prevData) => ({ ...prevData, city: e.target.value }));
    } else if (e.target.name === "state") {
      setShippingData((prevData) => ({ ...prevData, state: e.target.value }));
    } else if (e.target.name === "pincode") {
      setShippingData((prevData) => ({ ...prevData, pincode: e.target.value }));
    } else if (e.target.name === "phone") {
      setShippingData((prevData) => ({ ...prevData, phone: e.target.value }));
    } else if (e.target.name === "address") {
      setShippingData((prevData) => ({ ...prevData, address: e.target.value }));
    } else if (e.target.name === "billingFirstName") {
      setBillingData((prevData) => ({
        ...prevData,
        firstName: e.target.value,
      }));
    } else if (e.target.name === "billingLastName") {
      setBillingData((prevData) => ({ ...prevData, lastName: e.target.value }));
    } else if (e.target.name === "billingAddress") {
      setBillingData((prevData) => ({ ...prevData, address: e.target.value }));
    } else if (e.target.name === "billingCity") {
      setBillingData((prevData) => ({ ...prevData, city: e.target.value }));
    } else if (e.target.name === "billingState") {
      setBillingData((prevData) => ({ ...prevData, state: e.target.value }));
    } else if (e.target.name === "billingPincode") {
      setBillingData((prevData) => ({ ...prevData, pincode: e.target.value }));
    } else if (e.target.name === "coupon") {
      setCoupon((prev) => ({ ...prev, code: e.target.value }));
    }
  };

  const handlerValidation = async () => {
    if (
      shippingData?.firstName?.length > 0 &&
      shippingData?.lastName?.length > 0 &&
      shippingData?.address.length > 0 &&
      shippingData?.city.length > 0 &&
      shippingData?.state.length > 0
    ) {
      if (validatePhone(shippingData?.phone)) {
        const validatePincode = await fetch(
          `https://api.postalpincode.in/pincode/${shippingData?.pincode}`
        ).then((response) => response.json());
        if (validatePincode?.[0]?.Status === "Success") {
          initiatePayment();
        } else {
          toast.error("Invalid Pincode", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("Invalid Phone Number", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Something Missing", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handlerCoupon = async () => {
    const couponRes = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/discountCoupon/checkDiscountCoupon`,
      {
        method: "POST",
        body: JSON.stringify({
          code: coupon?.code,
          amount: subtotal,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (couponRes?.success) {
      setCoupon((prev) => ({
        ...prev,
        value: couponRes?.value,
        isPercent: couponRes?.isPercent,
        codeId: couponRes?.codeId,
        isDiscounted: true,
        calDiscount: couponRes?.isPercent
          ? (subtotal * couponRes?.value) / 100
          : couponRes?.value,
      }));
      toast.success("Coupon Applied", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      party.confetti(document.getElementById("counpoContainer"), {
        count: party.variation.range(20, 40),
      });
    } else {
      setCoupon((prev) => ({
        ...prev,
        value: null,
        isPercent: null,
        codeId: null,
        isDiscounted: false,
      }));
      toast.error(couponRes?.error, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <Layouts>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="overflow-hidden">
        <div className="container px-5 pb-12 pt-8 mx-auto">
          <div className="flex flex-col xl:flex-row lg:flex-row">
            <div className="flex-1">
              <h3 className="text-3xl font-semibold font-Cinzel mb-4">
                Checkout
              </h3>
              <div className="px-4 py-2">
                <h4 className="font-medium text-lg">Contact information</h4>

                <div className="flex items-center mt-2">
                  <img
                    src={user?.image}
                    alt="User Iamge"
                    className="w-10 h-10 rounded-full shadow-sm z-10"
                  />
                  <div className="ml-2 flex flex-col text-sm">
                    <p>
                      {user?.name}({user.email})
                    </p>
                    <span
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="cursor-pointer text-primary-semi-light"
                    >
                      Logout
                    </span>
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="font-medium text-lg">Shipping information</h4>

                  {/*Creating Shipping Details Form*/}
                  <div className="mt-4">
                    <form method="post">
                      <Listbox
                        value={selectedAddress}
                        onChange={setSelectedAddress}
                      >
                        <div className="relative mt-1">
                          <Listbox.Button className="relative flex items-center text-left w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40">
                            <div className="flex flex-col">
                              <span className="text-xs -mb-1">
                                Saved Address
                              </span>
                              <span className="text-base truncate">
                                {selectedAddress.address
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
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-20 shadow-lg w-full border border-primary-black bg-white">
                              {userAddress.map((option, key) => (
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
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>

                      <Listbox value={country} onChange={setCountry}>
                        <Listbox.Button className="flex items-center text-left w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40">
                          <div className="flex flex-col">
                            <span className="text-xs -mb-1">
                              Select Country
                            </span>
                            <span className="text-base">
                              {country.name}(Currently Only {country.name} is
                              Available)
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
                          as={React.Fragment}
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

                      {!isBillingAddress && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.5 }}
                          className="my-4"
                        >
                          <h4 className="font-medium text-lg">
                            Billing information
                          </h4>
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
                      )}

                      <div className="flex items-center my-4">
                        <input
                          type="checkbox"
                          value={isChecked}
                          chacked={isChecked}
                          onChange={handleChange}
                          id="check"
                          name="giftCheck"
                          className="w-4 h-4 text-primary-dark bg-gray-100 rounded border-gray-300 focus:ring-primary focus:ring-2"
                        />
                        <label
                          htmlFor="checkbox"
                          className="ml-2 text-md font-medium text-gray-900"
                        >
                          Gifting Someone (50 will be extra)
                        </label>
                      </div>
                      <div className="flex items-center my-4">
                        <input
                          type="checkbox"
                          value={isBillingAddress}
                          checked={isBillingAddress}
                          onChange={handleChange}
                          id="billingAddress"
                          name="billingAddress"
                          className="w-4 h-4 text-primary-dark bg-gray-100 rounded border-gray-300 focus:ring-primary focus:ring-2"
                        />
                        <label
                          htmlFor="checkbox"
                          className="ml-2 text-md font-medium text-gray-900"
                        >
                          Billing address same as shipping
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col content-between bg-white p-2 rounded-md">
              <ul className="h-fit max-h-96  divide-y overflow-y-auto custom-scrollbar">
                {cartData.map((product) => (
                  <li
                    key={product._id}
                    className="flex py-4 group cursor-pointer"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={
                          allProducts.filter((p) => p._id === product._id)?.[0]
                            ?.images?.[0]?.url
                        }
                        alt={
                          allProducts.filter((p) => p._id === product._id)?.[0]
                            ?.title
                        }
                        className="h-full w-full object-cover object-center transform transition-all group-hover:scale-110"
                        width={"100%"}
                        height={"100%"}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-primary-black">
                          <h3 className="font-Cinzel font-medium group-hover:underline">
                            <Link href="/">
                              {
                                allProducts.filter(
                                  (p) => p._id === product._id
                                )?.[0]?.title
                              }
                            </Link>
                          </h3>
                          <p className="ml-4">
                            ₹
                            {
                              allProducts.filter(
                                (p) => p._id === product._id
                              )?.[0]?.discPrice
                            }
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Category Here
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
                                    allProducts.filter(
                                      (p) => p._id === product._id
                                    )?.[0]?.availableQty
                                      ? allProducts.filter(
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

              <div className="mt-auto px-6 ">
                <div className="my-1">
                  <div
                    id="counpoContainer"
                    className="flex item-center justify-between w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 border-primary-semi-light"
                  >
                    <div className="relative z-0">
                      <input
                        type="text"
                        id="coupon"
                        name="coupon"
                        value={coupon?.code}
                        onChange={handlerChange}
                        className="block py-2 px-0 w-full text-primary-black bg-transparent appearance-none focus:outline-none focus:ring-0  peer"
                        placeholder=" "
                      />
                      <label
                        for="coupon"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus-within:mt-2 peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Coupon Code
                      </label>
                    </div>
                    <button
                      onClick={handlerCoupon}
                      className="font-Cinzel font-semibold text-lg hover:text-primary hover:underline transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {coupon?.isDiscounted && (
                    <p
                      id="filled_error_help"
                      class="mt-2 text-xs text-green-500"
                    >
                      <span class="font-medium">Wow!</span> coupon applied of{" "}
                      {coupon?.isPercent
                        ? `${coupon?.value}%`
                        : `₹${coupon?.value}`}{" "}
                      off.
                    </p>
                  )}
                </div>
                <div className="my-1 flex items-center justify-between">
                  <p>Subtotal</p>
                  <span>₹{subtotal}</span>
                </div>

                {coupon?.isDiscounted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="my-1 flex items-center justify-between"
                  >
                    <p>Discount</p>
                    <span>
                      -₹
                      {coupon?.isPercent
                        ? (coupon?.calDiscount * coupon?.value) / 100
                        : coupon?.value}
                    </span>
                  </motion.div>
                )}

                {isChecked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="my-1 flex items-center justify-between"
                  >
                    <p>Gift wrapping</p>
                    <span>₹50</span>
                  </motion.div>
                )}

                <div className="my-0.5 flex items-center justify-between">
                  <p>Shipping</p>
                  <span>Free Shipping</span>
                </div>

                <div className="my-2 w-full border-t border-gray-200"></div>

                <div className="my-4 flex items-center justify-between">
                  <p className="font-medium">Total</p>
                  <span className="text-2xl font-medium font-Cinzel text-primary">
                    <span className="text-base">₹</span>
                    {total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row lg:flex-row items-center justify-center my-6 gap-4">
            <Link href="/">
              <div className="relative inline-flex items-center px-8 py-3 overflow-hidden group cursor-pointer">
                <span className="text-lg font-medium font-Cinzel text-primary transition-all group-hover:ml-4 group-hover:underline">
                  Return to homepage
                </span>
                <span className="absolute hidden group-hover:block left-0 transition-transform translate-x-full text-primary">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                </span>
              </div>
            </Link>
            <button
              onClick={handlerValidation}
              className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-primary rounded group active:bg-primary-semi-light focus:outline-none focus:ring focus:ring-primary-dark"
            >
              <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                <span className="font-Cinzel">
                  <span className="text-xs">₹</span>
                  {total}
                </span>
              </span>

              <span className="text-sm font-medium transition-all group-hover:mr-6">
                Pay Now
              </span>
            </button>
          </div>
        </div>
      </section>
    </Layouts>
  );
}

export default Checkout;
