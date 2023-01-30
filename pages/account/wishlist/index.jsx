import React, { useEffect, useState } from "react";
import WishLists from "../../../components/sections/WishLists";
import Layouts from "../../../components/layouts/Layouts";
import PageTitle from "../../../components/PageTitle";
import ShimmerProductCard from "../../../components/card/ShimmerProductCard";

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getWishlistProducts() {
    const wishlistRes = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/wishlist`
    );
    const wishlistData = await wishlistRes.json();
    if (wishlistData.success) setProducts(wishlistData.products);
    setLoading(false);
  }

  useEffect(() => {
    getWishlistProducts();
  }, []);
  return (
    <Layouts>
      <PageTitle title={"Wishlist"} />
      <section className="px-4 py-12">
        <div className="mx-auto">
          <div className="px-8 py-2 text-center">
            <h2 className="text-3xl font-Cinzel font-semibold text-primary">
              Wishlist
            </h2>
            <div className="text-center">
              {loading ? (
                <>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                      <React.Fragment key={index}>
                        <ShimmerProductCard />
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : (
                <>
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
                                Sorry about that! Please visit our homepage to
                                get where you need to go.
                              </p>
                            </div>
                          </div>
                          <div className="text-center">
                            <h3 className="text-6xl font-extrabold font-BrownSugar text-primary-light opacity-30">
                              EMPTY WISHLIST
                            </h3>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
}
