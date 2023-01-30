import React, { useEffect, useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import { CartState } from "../../context/Context";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import "react-medium-image-zoom/dist/styles.css";
import Reviews from "../../components/sections/Reviews";
import ShareButton from "../../components/buttons/ShareButton";
import { motion } from "framer-motion";
import BoughtTogether from "../../components/sections/BoughtTogether";
import StarCard from "../../components/card/StarCard";
import ProductCard from "../../components/card/ProductCard";
import Layouts from "../../components/layouts/Layouts";
import PageTitle from "../../components/PageTitle";

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  const session = await getSession(context);

  const productRes = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/getProducts/slug`,
    {
      method: "POST",
      body: JSON.stringify({
        slug: slug,
      }),
      header: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  const product = await productRes.json();

  if (product.success === false) {
    return {
      notFound: true,
    };
  }

  const reviews = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/reviews/getReviews`,
    {
      method: "POST",
      body: JSON.stringify({
        product: product.product?._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  let relatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/getProducts?category=${product.product?.category}&limit=4`
  ).then((res) => res.json());
  console.log("Image", relatedProducts);
  relatedProducts = relatedProducts?.products.filter(
    (p) => p._id !== product?.product?._id
  );
  return {
    props: {
      product: product.product,
      reviews: reviews?.reviews,
      relatedProducts,
    },
  };
}

function ProductPage({ product, Wish, reviews, relatedProducts }) {
  const router = useRouter();
  const {
    state: { cartItems },
    dispatch,
  } = CartState();
  const { data: session } = useSession();
  const [cart, setCart] = React.useState([]);
  const [currImage, setCurrImage] = React.useState(product?.images?.[0]);
  const [isWishListed, setIsWishListed] = useState(false);

  async function addToWishlist() {
    if (session) {
      const wlRes = await fetch("/api/wishlist", {
        method: "POST",
        body: JSON.stringify({
          productId: product?._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const wlData = await wlRes.json();
      if (wlData.success) {
        setIsWishListed(true);
      } else {
        setIsWishListed(false);
      }
    }
  }

  async function removeFromWishlist() {
    if (session) {
      const wlRes = await fetch("/api/wishlist", {
        method: "DELETE",
        body: JSON.stringify({
          productId: product?._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const wlData = await wlRes.json();
      if (wlData.success) {
        setIsWishListed(false);
      } else {
        setIsWishListed(true);
      }
    }
  }

  const wishlistHandler = () => {
    if (session) {
      if (isWishListed) {
        removeFromWishlist();
      } else {
        addToWishlist();
      }
    } else {
      router.push("/login");
    }
  };

  async function checkItemInWishList() {
    let data = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/wishlist/checkWishlist`,
      {
        method: "POST",
        body: JSON.stringify({
          productId: product._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    data = await data.json();
    console.log("Data", data);
    setIsWishListed(data.success);
  }

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    setCurrImage(product?.images?.[0]);
  }, [product]);

  useEffect(() => {
    checkItemInWishList();
  }, []);

  return (
    <Layouts>
      <PageTitle
        title={product.title}
        description={product.shortDesc}
        keywords={product.tags.join(",")}
        image={`https://og-image-nextjs.vercel.app/api/generate-og-image-playwrite?title=${product.title}&desc=${product.shortDes}&price=${product.price}&discPrice=${product.discPrice}&imageURL=${product.images[0].url}`}
      />
      <motion.div exit={{ opacity: 0 }}>
        <section className="text-gray-600 overflow-hidden">
          <div className="container px-5 py-12 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="flex flex-col lg:w-1/2">
                <div className="lg:w-3/4 w-full h-fit rounded">
                  <Zoom>
                    <Image
                      width={400}
                      height={400}
                      className="object-cover object-center rounded-md"
                      src={currImage?.url}
                      alt={currImage?.alt}
                      blurDataURL={currImage?.url}
                      placeholder="blur"
                    />
                  </Zoom>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {product?.images.map((image, key) => (
                    <motion.div
                      key={key}
                      className="relative w-16 h-16 p-0 rounded-md border-2 border-primary overflow-hidden"
                      inherit={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      <Image
                        src={image?.url}
                        fill
                        layout="fill"
                        alt={image?.alt}
                        className="cursor-pointer m-0 object-center object-cover rounded-md"
                        onClick={() => setCurrImage(image)}
                      />
                    </motion.div>
                  ))}
                  {/* <Image src={productImage} width={'60px'} height={'60px'} className="rounded cursor-pointer" />
            <Image src={productImage} width={'60px'} height={'60px'} className="rounded cursor-pointer" /> */}
                </div>
              </div>
              <div className="lg:w-1/2 lg:-ml-28 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm font-semibold text-primary-semi-light tracking-widest">
                  {product.category.toUpperCase()}
                </h2>
                <h1 className="text-primary-black text-3xl font-medium font-Cinzel mb-1">
                  {product.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <StarCard rating={product?.rating} />
                    <span className="text-gray-600 ml-3">
                      {product?.numReviews} Reviews
                    </span>
                  </span>
                  <span className="ml-3 pl-3 border-l-2 border-gray-200 space-x-2s">
                    <ShareButton product={product} />
                  </span>
                </div>

                <div className="flex items-baseline my-2 gap-2">
                  <span className="font-Cinzel font-medium text-3xl text-primary-black">
                    <span className="text-lg">₹</span>
                    {product.discPrice}
                  </span>
                  <span className="font-Cinzel font-medium text-xl text-gray-500">
                    <span className="text-lg">₹</span>
                    <span className="line-through">{product.price}</span>
                  </span>
                </div>

                <p className="leading-relaxed pb-5 border-b-2 border-gray-100 mb-5">
                  {product.shortDesc}
                </p>
                {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-primary rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
        </div> */}
                <div className="flex items-center">
                  {product?.availableQty > 0 ? (
                    <>
                      {cart.some((p) => p._id === product._id) ? (
                        <button
                          className=""
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: product,
                            })
                          }
                        >
                          <div
                            className="relative inline-block group focus:outline-none focus:ring cursor-pointer"
                            href="/download"
                          >
                            <span className="absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
                            <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
                              Remove from Cart
                            </span>
                          </div>
                        </button>
                      ) : (
                        <button
                          className=""
                          onClick={() =>
                            dispatch({
                              type: "ADD_TO_CART",
                              payload: product,
                            })
                          }
                        >
                          <div className="relative inline-block group focus:outline-none focus:ring cursor-pointer">
                            <span className="absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
                            <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
                              Add to Cart
                            </span>
                          </div>
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="font-semibold font-Cinzel text-red-500">
                        Out Of Stock
                      </p>
                    </>
                  )}
                  <button
                    onClick={wishlistHandler}
                    className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ${
                      isWishListed
                        ? "bg-red-200 hover:bg-gray-200"
                        : "text-gray-500 bg-gray-200 hover:bg-red-200"
                    } ml-4 transition-all transform hover:scale-105 group`}
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className={`w-5 h-5 ${
                        isWishListed
                          ? "text-red-500 group-hover:text-gray-500"
                          : "text-gray-500 group-hover:text-red-500"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-4/5 mx-auto pt-8">
              <h3 className="text-2xl font-medium font-Cinzel text-primary-black">
                Description
              </h3>
              <p>{product.desc}</p>
            </div>

            {product?.collections && (
              <div className="lg:w-4/5 mx-auto mt-6">
                <BoughtTogether product={product?.collections} />
              </div>
            )}

            <div className="lg:w-4/5 mx-auto mt-6">
              <Reviews session={session} product={product} reviews={reviews} />
            </div>

            <div className="lg:w-4/5 mx-auto mt-6">
              <h3 className="text-2xl font-medium font-Cinzel text-primary-black">
                Related Products
              </h3>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 my-4">
                {relatedProducts.map((product) => (
                  <React.Fragment key={product?._id}>
                    <ProductCard allData={product} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </Layouts>
  );
}

export default ProductPage;
