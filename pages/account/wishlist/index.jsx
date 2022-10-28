import React from "react";
import { getSession } from "next-auth/react";
import WishLists from "../../../components/sections/WishLists";
import Layouts from "../../../components/layouts/Layouts";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const { user } = session;
  const wishlistRes = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/wishlist/getWishlist`,
    {
      method: "POST",
      body: JSON.stringify({
        userId: user?._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const wishlistData = await wishlistRes.json();
  if (!wishlistData.success) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      products: wishlistData?.products,
    },
  };
}

export default function Wishlist({ products }) {
  console.log(products);
  return (
    <Layouts>
      <section className="px-4 py-12">
        <div className="mx-auto">
          <div className="px-8 py-2 text-center">
            <h2 className="text-3xl font-Cinzel font-semibold text-primary">
              Wishlist
            </h2>
            <div className="text-center">
              {products.length > 0 ? (
                <WishLists products={products} />
              ) : (
                <>
                  <div className="w-full py-6 relative pb-12 lg:pb-0">
                    <div className="relative">
                      <div className="absolute w-full">
                        <div className="text-center">
                          <h1 className="my-2 text-primary-black font-bold text-2xl">
                            Looks like you've found the doorway to the great
                            nothing
                          </h1>
                          <p className="my-2 text-primary-black">
                            Sorry about that! Please visit our hompage to get
                            where you need to go.
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-6xl font-extrabold text-primary-light opacity-30">
                          EMPTY WISHLIST
                        </h3>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
}
