import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import { CartState } from '../../context/Context'
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import 'react-medium-image-zoom/dist/styles.css'
import Reviews from '../../components/sections/Reviews'


export async function getServerSideProps(context) {

  const { params: { slug } } = context;
  const session = await getSession(context);

  const productRes = await fetch('http://localhost:3000/api/products/getProducts/slug', {
    method: 'POST',
    body: JSON.stringify({
      slug: slug
    }),
    header: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });

  const product = await productRes.json();
  if (product.success === false) {
    return {
      notFound: true
    }
  }

  let Wish = {}
  if (session) {
    const { user } = session;
    const wishRes = await fetch('http://localhost:3000/api/wishlist/checkWishlist', {
      method: 'POST',
      body: JSON.stringify({
        userId: user?._id,
        productId: product?.product?.[0]?._id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const wishData = await wishRes.json();
    if (wishData.sucess) {
      Wish = wishData
    }
  }

  return {
    props: {
      product: product.product?.[0],
      Wish
    }
  }
}

function ProductPage({ product, Wish }) {
  const router = useRouter();
  const { state: { cartItems }, dispatch } = CartState();
  const { data: session } = useSession();
  const [cart, setCart] = React.useState([]);
  const [isWL, setIsWL] = React.useState(Wish.sucess);
  const [currImage, setCurrImage] = React.useState(product?.images?.[0]);

  async function addToWishlist() {
    if (session) {
      const wlRes = await fetch('/api/wishlist/addWishlist', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user?._id,
          productId: product?._id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const wlData = await wlRes.json();
      if (wlData.success) {
        setIsWL(true);
      } else {
        setIsWL(false);
      }
    } else {
      //err
    }
  }

  async function removeFromWishlist() {
    if (session) {
      const wlRes = await fetch('/api/wishlist/removeWishlist', {
        method: 'DELETE',
        body: JSON.stringify({
          userId: session?.user?._id,
          productId: product?._id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const wlData = await wlRes.json();
      if (wlData.success) {
        setIsWL(false);
      } else {
        setIsWL(true);
      }
    } else {
      //err
    }
  }

  const wishlistHandler = () => {
    if (session) {
      if (isWL) {
        removeFromWishlist();
      } else {
        addToWishlist();
      }
    } else {
      router.push('/login');
    }
  }

  React.useEffect(() => {
    setCart(cartItems);
  }, [cartItems])

  return (
    <React.Fragment>
      <section className="text-gray-600 overflow-hidden">
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className='flex flex-col'>
              <Zoom>
                <Image width={'400px'} height={'400px'} className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={currImage?.url} alt={currImage?.alt} blurDataURL={currImage?.url} placeholder='blur' />
              </Zoom>
              <div className='flex items-center gap-2 mt-3'>
                {product?.images.map((image, key) =>
                  <Image src={image?.url} width={'60px'} height={'60px'} alt={image?.alt} className="cursor-pointer rounded" onClick={() => setCurrImage(image)} />
                )}
                {/* <Image src={productImage} width={'60px'} height={'60px'} className="rounded cursor-pointer" />
            <Image src={productImage} width={'60px'} height={'60px'} className="rounded cursor-pointer" /> */}
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm font-semibold text-primary-semi-light tracking-widest">{product.category.toUpperCase()}</h2>
              <h1 className="text-primary-black text-3xl font-medium font-Cinzel mb-1">{product.title}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-primary" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-primary" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-primary" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-primary" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-primary" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>

              <div className='flex items-center my-2 gap-2'>
                <span className="font-Cinzel font-medium text-3xl text-primary-black"><span className='text-lg'>₹</span>{product.discPrice}</span>
                <span className="font-Cinzel font-medium text-xl text-gray-500"><span className='text-lg'>₹</span><span className='line-through'>{product.price}</span></span>
              </div>

              <p className="leading-relaxed pb-5 border-b-2 border-gray-100 mb-5">{product.shortDesc}</p>
              {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-primary rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
        </div> */}
              <div className="flex items-center">
                {cart.some(p => p._id === product._id) ? (
                  <button className='' onClick={() => dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                  })}>
                    <div className="relative inline-block group focus:outline-none focus:ring cursor-pointer" href="/download">
                      <span className="absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
                      <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
                        Remove from Cart
                      </span>
                    </div>
                  </button>
                ) : (
                  <button className='' onClick={() => dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                  })}>
                    <div className="relative inline-block group focus:outline-none focus:ring cursor-pointer" href="/download">
                      <span className="absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
                      <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
                        Add to Cart
                      </span>
                    </div>
                  </button>
                )}
                <button onClick={wishlistHandler} className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ${isWL ? 'bg-red-200 hover:bg-gray-200' : 'text-gray-500 bg-gray-200 hover:bg-red-200'} ml-4 transition-all transform hover:scale-105 group`}>
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className={`w-5 h-5 ${isWL ? 'text-red-500 group-hover:text-gray-500' : 'text-gray-500 group-hover:text-red-500'}`} viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className='lg:w-4/5 mx-auto pt-8'>
            <h3 className='text-2xl font-medium font-Cinzel text-primary-black'>Description</h3>
            <p>{product.desc}</p>
          </div>

          <div className='lg:w-4/5 mx-auto mt-6'>
            <Reviews />
          </div>

        </div>
      </section>
    </React.Fragment>
  )
}

export default ProductPage
