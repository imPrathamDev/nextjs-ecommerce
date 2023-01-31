import React from "react";
import Link from "next/link";
import Image from "next/image";
import connectdb from "../../../utils/connectMongo";
import Order from "../../../models/Orders";
import moment from "moment";
import { useRouter } from "next/router";
import { CartState } from "../../../context/Context";
import party from "party-js";
import InvoiceModel from "../../../components/models/InvoiceModel";
import Layouts from "../../../components/layouts/Layouts";
import PageTitle from "../../../components/PageTitle";

export async function getServerSideProps(context) {
  await connectdb();
  const refresh = context.query.refresh;
  const order = await Order.findById(context.params.id)
    .populate("products._id")
    .populate("discountCodeId");
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      refresh: refresh || "false",
    },
  };
}

export default function OrderPage({ order, refresh }) {
  const router = useRouter();
  const { dispatch } = CartState();
  const [subtotal, setSubtotal] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    setSubtotal(
      order.products.reduce((acc, cur) => acc + cur._id?.discPrice * cur.qty, 0)
    );
  }, []);
  React.useEffect(() => {
    if (router.query.refresh === "true") {
      dispatch({
        type: "CLEAR_CART",
        payload: [],
      });
      party.confetti(document.body, {
        count: party.variation.range(45, 40),
        size: party.variation.range(1.2, 1.3),
        spread: party.variation.range(70, 80),
      });
    }
  }, []);

  const address = JSON.parse(order.address);
  const billingAddress = JSON.parse(order.billingAddress);
  const payment = JSON.parse(order.paymentInfo);

  return (
    <Layouts>
      <PageTitle title={"My Order"} />
      <section className="px-4 pt-8 pb-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
        <InvoiceModel isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="max-w-3xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Thank you!
            </h1>
            {refresh === "true" ? (
              <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Wow! order has been placed.
              </p>
            ) : (
              <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {order.status === "Pending"
                  ? "Oops! order is pending."
                  : order.status === "Shipped"
                  ? "It's on the way!"
                  : order.status === "Completed"
                  ? "Your delivered sucessfully"
                  : ""}
              </p>
            )}
            <p className="mt-2 text-base text-gray-500">
              Your order #{order.orderId} has shipped and will be with you soon.
            </p>

            <div className="mt-12 font-medium flex items-center justify-between">
              <dl className="text-sm">
                <dt className="text-primary-black">Tracking number</dt>
                <dd className="text-primary mt-2">
                  {order?.trackingId.toLowerCase() === "na"
                    ? "Soon Updated"
                    : order?.trackingId}
                </dd>
              </dl>
              <dl className="text-base text-primary-white flex items-center gap-2">
                <button
                  onClick={() => InvoiceGen()}
                  className="p-3 rounded-md shadow-md bg-primary hover:bg-primary-dark transition-all transform hover:scale-105"
                >
                  Invoice
                </button>
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-3 rounded-md shadow-md bg-primary hover:bg-primary-dark transition-all transform hover:scale-105"
                >
                  Track Order
                </button>
              </dl>
            </div>
          </div>

          <section
            aria-labelledby="order-heading"
            className="mt-10 border-t border-gray-200"
          >
            <h2 id="order-heading" className="sr-only">
              Your order
            </h2>

            <h3 className="sr-only">Items</h3>
            {order.products.map((product) => (
              <div
                key={product._id._id}
                className="py-10 border-b border-gray-200 flex space-x-6 group"
              >
                <div className="lg:w-1/4 relative overflow-hidden">
                  <Image
                    src={product._id?.images[0]?.url}
                    alt={product._id?.images[0]?.alt}
                    layout="fill"
                    className="flex-none object-center object-cover bg-gray-100 rounded-lg w-52 h-52 sm:w-40 sm:h-40 transition-all transform group-hover:scale-105"
                  />
                </div>
                <div className="flex-auto flex flex-col lg:w-3/4">
                  <div>
                    <h4 className="font-medium font-Cinzel text-base lg:text-lg text-primary-black hover:underline hover:text-primary transition-all">
                      <Link href={`/shop/${product._id?.slug}`}>
                        {product._id?.title}
                      </Link>
                    </h4>
                    <p className="mt-2 text-xs lg:text-sm text-gray-600">
                      {product._id?.shortDesc}
                    </p>
                  </div>
                  <div className="mt-6 flex-1 flex items-end">
                    <dl className="flex text-base divide-x divide-gray-200 space-x-4 sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-primary-black">
                          Quantity
                        </dt>
                        <dd className="ml-2 text-gray-700">{product.qty}</dd>
                      </div>
                      <div className="pl-4 flex sm:pl-6">
                        <dt className="font-medium text-primary-black">
                          Price
                        </dt>
                        <div className="flex items-baseline gap-1">
                          <dd className="ml-2 text-gray-700">
                            <span className="text-xs">₹</span>
                            {product?.discPrice}
                          </dd>
                          <dd className="ml-2 text-gray-700 line-through text-xs">
                            ₹{product?.price}
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

            <div className="sm:ml-40 sm:pl-6">
              <h3 className="sr-only">Your information</h3>

              <h4 className="sr-only">Addresses</h4>
              <dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
                <div>
                  <dt className="font-semibold text-primary-black text-base">
                    Shipping address
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block font-semibold">
                        {address.firstName} {address.lastName}
                      </span>
                      <span className="block">{address.address},</span>
                      <span className="block">
                        {address.city} {address.pincode}, {address.state}
                      </span>
                      <span className="block">
                        <span className="font-semibold">Phone:</span>{" "}
                        {order.phone}
                      </span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-primary-black text-base">
                    Billing address
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block font-semibold">
                        {billingAddress.firstName} {billingAddress.lastName}
                      </span>
                      <span className="block">{billingAddress.address}</span>
                      <span className="block">
                        {billingAddress.city} ({billingAddress.pincode}),{" "}
                        {billingAddress.state}
                      </span>
                    </address>
                  </dd>
                </div>
              </dl>

              <h4 className="sr-only">Payment</h4>
              <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
                <div>
                  <dt className="font-semibold text-primary-black text-base">
                    Payment method
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    {payment.method === "netbanking" ? (
                      <>
                        <p>{payment.method.toUpperCase()}</p>
                        <p>Bank: {payment.bank}</p>
                      </>
                    ) : payment.method === "card" ? (
                      <>
                        <p>
                          {payment.card.type.toUpperCase()}{" "}
                          {payment.method.toUpperCase()}
                        </p>
                        <p>{payment.card.name}</p>
                        <p>**** **** **** {payment.card.last4}</p>
                      </>
                    ) : payment.method === "wallet" ? (
                      <>
                        <p>{payment.method.toUpperCase()}</p>
                        <p>{payment.wallet}</p>
                      </>
                    ) : payment.method === "upi" ? (
                      <>
                        <p>{payment.method.toUpperCase()}</p>
                        <p>UPI Id: {payment?.vpa}</p>
                      </>
                    ) : (
                      <p>No Available</p>
                    )}
                    <p>
                      At{" "}
                      {moment(payment.created_at * 1000).format(
                        "h:mm:ss a, [on] MMMM Do YYYY"
                      )}
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-base text-primary-black">
                    Shipping method
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <p>DHL</p>
                    <p>Takes up to 3 working days</p>
                  </dd>
                </div>
              </dl>

              <h3 className="sr-only">Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
                <div className="flex justify-between">
                  <dt className="font-semibold text-base text-primary">
                    Subtotal
                  </dt>
                  <dd className="text-gray-700">₹{subtotal}</dd>
                </div>
                {order.isDiscountCode && (
                  <div className="flex justify-between">
                    <dt className="flex font-semibold text-primary-black">
                      Discount
                      <span className="rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 ml-2">
                        {order?.discountCodeId?.code}
                      </span>
                    </dt>
                    <dd className="text-gray-700">-₹{order?.discount}</dd>
                  </div>
                )}
                {order.giftWrap && (
                  <div className="flex justify-between">
                    <dt className="flex font-semibold text-primary-black">
                      Gift Wrapping
                    </dt>
                    <dd className="text-gray-700">₹{order.giftWrapCost}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="font-semibold text-primary-black">Shipping</dt>
                  <dd className="text-gray-700">
                    {order.shippingCost > 0
                      ? `₹${order.shippingCost}`
                      : "Free Shipping"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-semibold text-primary-black">Total</dt>
                  <dd className="text-primary-black text-lg font-Cinzel">
                    <span className="text-sm">₹</span>
                    {order.amount}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </section>
    </Layouts>
  );
}
