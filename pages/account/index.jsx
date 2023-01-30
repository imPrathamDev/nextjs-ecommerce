import React from "react";
import Link from "next/link";
import connectdb from "../../utils/connectMongo";
import User from "../../models/Users";
import Order from "../../models/Orders";
import { signOut, getSession } from "next-auth/react";
import OrdersCard from "../../components/card/OrdersCard";
import Layouts from "../../components/layouts/Layouts";
import PageTitle from "../../components/PageTitle";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { user } = session;
  await connectdb();
  let orders;
  if (user) {
    const count = await User.countDocuments({ _id: user?._id });
    if (count > 0) {
      orders = await Order.find(
        { userId: user?._id, txnStatus: "Paid" },
        null,
        { limit: 4 }
      )
        .populate("products._id")
        .sort({ createdAt: -1 });
    }
  }
  return {
    props: {
      user,
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

function MyAccount({ user, orders }) {
  return (
    <Layouts>
      <section className="px-4 py-12">
        <PageTitle title={"My Account"} />
        <div className="mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-Cinzel font-semibold text-primary">
              My Account
            </h1>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="py-2 underline text-base text-primary-black cursor-pointer transition-all hover:text-primary"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-col gap-y-6 lg:flex-row lg:justify-center mx-auto py-4 max-w-5xl">
            <div className="lg:h-screen lg:sticky lg:top-20 mx-4 basis-1/4">
              <h2 className="font-Cinzel font-medium text-lg text-primary-black">
                Account Details
              </h2>
              <div className="text-base py-2">
                <div className="flex gap-1 items-center my-2">
                  <img
                    src={user?.image}
                    className="h-10 w-10 rounded-full shadow-sm"
                  />
                  <div className="flex flex-col">
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <Link href="/account/address">
                  <a>
                    <div className="text-center w-full py-2 bg-primary-black text-primary-white my-2 transition-all hover:bg-primary">
                      View Address
                    </div>
                  </a>
                </Link>

                <Link href="/account/wishlist">
                  <a>
                    <div className="text-center w-full py-2 bg-primary-black text-primary-white transition-all hover:bg-primary">
                      View Wishlist
                    </div>
                  </a>
                </Link>
              </div>
            </div>

            <div className="lg:basis-3/4 w-full">
              <h2 className="font-Cinzel font-medium text-lg text-primary-black text-end">
                Order History
              </h2>
              {!orders.length > 0 && (
                <p className="text-end text-sm text-gray-600">
                  You haven't placed any orders yet.
                </p>
              )}
              {orders.length > 0 && (
                <>
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <OrdersCard order={order} />
                    </React.Fragment>
                  ))}
                  <span className="text-end font-Cinzel text-primary underline hover:text-primary-dark cursor-pointer">
                    <Link href="/account/orders">View More</Link>{" "}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
}

export default MyAccount;
