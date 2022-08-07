import React from "react";
import connectdb from "../../../utils/connectMongo";
import Order from '../../../models/Orders';
import User from "../../../models/Users";
import { getSession } from "next-auth/react"
import OrdersCard from "../../../components/card/OrdersCard";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
    if(!session){
      return {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
    }
  const { user } = session;
  let myOrders = []
  if(user){
    await connectdb();
    const count = await User.countDocuments({ _id: user._id });
    if(count>0){
    myOrders = await Order.find({ userId: user._id }).populate('products._id');
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
    }
  }
  return {
    props: {
      user,
      myOrders: JSON.parse(JSON.stringify(myOrders))
    },
  }
}

export default function MyOrders({ user, myOrders }) {
  return (
    <div className="">
      <div className="py-8 sm:py-16">
        <div className="max-w-[90rem] mx-auto sm:px-2 lg:px-8">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-extrabold font-Cinzel tracking-tight text-primary-black sm:text-3xl">Order history</h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and discover similar products.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="sr-only">Recent orders</h2>
          <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {myOrders.map((order) => (
                <React.Fragment key={order._id}>
                <OrdersCard order={order} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}