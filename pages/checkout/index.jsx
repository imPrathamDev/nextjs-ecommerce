import { Fragment, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { CartState } from "../../context/Context";
import Link from "next/link";
import Script from "next/script";
import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import party from "party-js";
import { AnimatePresence, motion } from "framer-motion";
import Layouts from "../../components/layouts/Layouts";
import PageTitle from "../../components/PageTitle";
import ShippingAddress from "../../components/checkout/ShippingAddress";
import { Countries, DEFAULT_SHIPPING_PRICE } from "../../static/staticData";
import BillingAddress from "../../components/checkout/BillingAddress";
import ProductsList from "../../components/checkout/ProductsList";
import ShimmerProductsList from "../../components/checkout/ShimmerProductsList";
import Toast from "../../components/Toast/Toast";
import CouponCode from "../../components/checkout/CouponCode";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { user } = session;
  return {
    props: {
      user,
    },
  };
}

function Checkout({ user }) {
  const router = useRouter();
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const {
    state: { cartItems },
    dispatch,
  } = CartState();
  const [subtotal, setSubtotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(DEFAULT_SHIPPING_PRICE);
  const [total, setTotal] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [country, setCountry] = useState(Countries[0]);
  const [isBillingAddress, setIsBillingAddress] = useState(true);
  const [userAddress, setUserAddress] = useState([]);
  const [coupon, setCoupon] = useState({
    code: "",
    isDiscounted: false,
    calDiscount: 0,
  });
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [toast, setToast] = useState({
    show: false,
    msg: "",
    error: false,
  });

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
    setToast({ show: true, msg: `Please wait processing`, error: false });
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
      setToast({ show: true, msg: orderJSON.error, error: true });
    } else {
      options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderJSON.amount,
        currency: orderJSON.currency,
        name: "REALE",
        description: "Test Transaction",
        image:
          "https://nextjs-ecommerce-woad.vercel.app/logo/logo-transparent-black.png",
        order_id: orderJSON.id,
        callback_url:
          "https://nextjs-ecommerce-woad.vercel.app/api/payments/postTranscation",
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: shippingData?.phone,
        },
        notes: {
          address: "NOT ADDED FOR NOW",
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
          setToast({ show: true, msg: `Invalid PinCode`, error: true });
        }
      } else {
        setToast({ show: true, msg: `Invalid Phone Number`, error: true });
      }
    } else {
      setToast({ show: true, msg: `Something missing`, error: true });
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
      setToast({ show: true, msg: `Coupon Applied`, error: false });
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
        calDiscount: 0,
      }));
      setToast({ show: true, msg: couponRes?.error, error: true });
    }
  };

  const handlerGetAddress = async () => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/address`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setUserAddress(data.data);
          setSelectedAddress(data.data[0]);
        }
      });
  };

  const handlerGetProducts = async (cartData) => {
    let ids = [];
    cartData.forEach((element) => {
      ids.push(element._id);
    });
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/getProductsByIds`, {
      method: "POST",
      body: JSON.stringify({
        ids,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  };

  useEffect(() => {
    handlerGetProducts(cartItems);
    setCartData(cartItems);
    handlerGetAddress();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setSubtotal(
        cartItems.reduce(
          (acc, curr) =>
            acc +
            products.filter((p) => p._id === curr._id)?.[0]?.discPrice *
              curr.qty,
          0
        )
      );
      setTotal(
        isChecked
          ? subtotal - coupon?.calDiscount + shippingPrice + 50
          : subtotal - coupon?.calDiscount + shippingPrice
      );
    }
    if (!cartItems.length > 0) {
      router.push("/");
      setToast({ show: true, msg: `Empty Cart`, error: true });
    }
  }, [cartItems, subtotal, total, shippingPrice, coupon, products, isChecked]);

  useEffect(() => {
    if (userAddress.length > 0) {
      setShippingData(selectedAddress);
    }
  }, [selectedAddress, userAddress]);

  return (
    <Layouts>
      <PageTitle title={"Checkout"} />
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <section className="overflow-hidden">
        <Toast showToast={toast} setShowToast={setToast} />
        <div className="container lg:px-14 pb-12 pt-8 mx-auto">
          <div className="flex flex-col xl:flex-row lg:flex-row">
            <div className="flex-1">
              <h3 className="text-3xl font-semibold font-Cinzel mb-4 ml-2 lg:ml-0">
                Checkout
              </h3>
              <div className="px-4 py-2">
                <h4 className="font-medium text-lg">Contact information</h4>

                <div className="flex items-center mt-2">
                  <img
                    src={user?.image}
                    alt="User Image"
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
                    <div className="">
                      <ShippingAddress
                        handlerChange={handlerChange}
                        shippingData={shippingData}
                        setSelectedAddress={setSelectedAddress}
                        selectedAddress={selectedAddress}
                        userAddress={userAddress}
                        country={country}
                        setCountry={setCountry}
                      />
                      <AnimatePresence>
                        {!isBillingAddress && (
                          <BillingAddress
                            handlerChange={handlerChange}
                            billingData={billingData}
                          />
                        )}
                      </AnimatePresence>

                      <div className="flex items-center my-4 gap-2">
                        <Switch
                          checked={isChecked}
                          onChange={setIsChecked}
                          className={`${
                            isChecked ? "bg-primary-light/90" : "bg-gray-300"
                          } relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              isChecked ? "translate-x-6" : "translate-x-0"
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-primary-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                          />
                        </Switch>
                        <span>Gifting Someone (50 will be extra)</span>
                      </div>
                      <div className="flex items-center my-4 gap-2">
                        <Switch
                          checked={isBillingAddress}
                          onChange={setIsBillingAddress}
                          className={`${
                            isBillingAddress
                              ? "bg-primary-light/90"
                              : "bg-gray-300"
                          } relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              isBillingAddress
                                ? "translate-x-6"
                                : "translate-x-0"
                            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-primary-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                          />
                        </Switch>
                        <span>Billing Address same as shipping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col content-between bg-white p-2 rounded-md lg:w-1/3">
              {loading ? (
                <>
                  <div className="flex flex-col gap-y-2">
                    {[0, 1, 2, 3].map((key) => (
                      <Fragment key={key}>
                        <ShimmerProductsList />
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : (
                <ProductsList
                  cartData={cartData}
                  products={products}
                  dispatch={dispatch}
                />
              )}

              <div className="mt-auto px-6 ">
                <div className="my-4">
                  <CouponCode
                    handlerCoupon={handlerCoupon}
                    coupon={coupon}
                    handlerChange={handlerChange}
                  />
                  <AnimatePresence>
                    {coupon?.isDiscounted && (
                      <motion.p
                        initial={{ opacity: 0.2 }}
                        exit={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-xs text-green-500"
                      >
                        <span className="font-medium">Wow!</span> coupon applied
                        of{" "}
                        {coupon?.isPercent
                          ? `${coupon?.value}%`
                          : `₹${coupon?.value}`}{" "}
                        off.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="my-1 flex items-center justify-between">
                  <p>Subtotal</p>
                  {loading ? (
                    <div className="h-4 w-14 bg-gray-300 rounded-sm animate-pulse"></div>
                  ) : (
                    <span>₹{subtotal}</span>
                  )}
                </div>

                <AnimatePresence>
                  {coupon?.isDiscounted && (
                    <motion.div
                      initial={{ opacity: 0.2, x: 700 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0.2, x: 700 }}
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
                </AnimatePresence>
                <AnimatePresence>
                  {isChecked && (
                    <motion.div
                      initial={{ opacity: 0.2, x: 700 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0.2, x: 700 }}
                      transition={{ duration: 0.5 }}
                      className="my-1 flex items-center justify-between"
                    >
                      <p>Gift wrapping</p>
                      <span>₹50</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="my-0.5 flex items-center justify-between">
                  <p>Shipping</p>
                  <span>Free Shipping</span>
                </div>

                <div className="my-2 w-full border-t border-gray-200"></div>

                <div className="my-4 flex items-center justify-between">
                  <p className="font-medium">Total</p>
                  {loading ? (
                    <div className="h-6 w-12 bg-gray-300 rounded-sm animate-pulse"></div>
                  ) : (
                    <span className="text-2xl font-medium font-Cinzel text-primary">
                      <span className="text-base">₹</span>
                      {total}
                    </span>
                  )}
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

              <span className="text-sm font-medium transition-all group-hover:mr-8">
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
