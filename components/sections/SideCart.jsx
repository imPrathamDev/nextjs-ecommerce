import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { CartState } from '../../context/Context'

import emptyCart from '../../public/empty-image.png'

// export async function getServerSideProps(context) {
//   const response = await fetch('http://localhost:3000/api/products/getProducts');
//     const newData = await response.json();
//     console.log('prr', newData)
//   return {
//     props: {products: newData.products},
//   }
// }

function SideCart({ isCartOpen, setIsCartOpen }) {
  const router = useRouter();
  const { state: { cartItems }, dispatch } = CartState();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTotal(cartItems.reduce((acc, curr) => acc + products.filter(p => p._id === curr._id)?.[0]?.discPrice * curr.qty, 0));
  }, [cartItems, products]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/getProducts`);
      const newData = await response.json();
      setProducts(newData.products);
    }
    fetchData();
  }, [])

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsCartOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-primary-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-semibold text-primary-black"> Shopping cart </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-primary transition-all group"
                            onClick={() => setIsCartOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-all transform group-hover:scale-125 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {!cartItems.length > 0 && (<div className='w-full h-fit text-center flex flex-col mt-12 items-center justify-center'>
                        <div className='relative w-60 h-60 overflow-hidden'>
                        <Image src={emptyCart} layout='fill' className='my-2 object-center object-cover' />
                        </div>
                        <p className='text-lg font-medium'>Your Cart is Empty!</p>
                      </div>)}
                      <div className="mt-8">
                        <div className="flow-root">
                          {cartItems.length > 0 && (<ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((cartMapData) => (
                              <Fragment key={cartMapData._id}>
                                <li className="flex py-6 group">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={products.filter(p => p._id === cartMapData._id)?.[0]?.images?.[0]?.url}
                                      alt={products.filter(p => p._id === cartMapData._id)?.[0]?.title}
                                      className="h-full w-full object-cover object-center"
                                      width={'100%'}
                                      height={'100%'}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-primary-black">
                                        <h3 className='font-Cinzel hover:underline hover:text-primary transition-all'>
                                          {products.filter(p => p._id === cartMapData._id)?.[0]?.title}
                                        </h3>
                                        <p className="ml-4">₹{products.filter(p => p._id === cartMapData._id)?.[0]?.discPrice ? products.filter(p => p._id === cartMapData._id)?.[0]?.discPrice : 'NA'}</p>
                                      </div>
                                      {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className='flex items-center gap-1 text-gray-500'>
                                        <button onClick={() => dispatch({
                                          type: 'CHANGE_QTY',
                                          payload: {
                                            _id: products.filter(p => p._id === cartMapData._id)?.[0]?._id,
                                            qty: cartMapData.qty === 1 ? 1 : cartMapData.qty - 1
                                          }
                                        })}>
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                          </svg>
                                        </button>
                                        <p className="">Qty {cartMapData.qty}</p>
                                        <button onClick={() => {
                                          dispatch({
                                            type: 'CHANGE_QTY',
                                            payload: {
                                              _id: cartMapData._id,
                                              qty: cartMapData.qty >= products.filter(p => p._id == cartMapData._id)?.[0]?.availableQty ? products.filter(p => p._id == cartMapData._id)?.[0]?.availableQty : cartMapData.qty + 1
                                            }
                                          })
                                        }}>
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                          </svg>
                                        </button>
                                      </div>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-primary-semi-light hover:text-primary-light"
                                          onClick={() => dispatch({
                                            type: 'REMOVE_FROM_CART',
                                            payload: cartMapData
                                          })}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </Fragment>
                            ))}
                          </ul>)}
                        </div>
                      </div>
                    </div>

                    {cartItems.length > 0 && (<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-primary-black">
                        <p>Subtotal</p>
                        <p>₹{total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className=''>
                        <button className="mt-6 text-center w-full" onClick={() => {
                          setIsCartOpen(false);
                          router.push('/checkout');
                        }}>
                          <div className="relative w-full inline-block group focus:outline-none focus:ring cursor-pointer" href="/download">
                            <span className="absolute w-full inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
                            <span className="relative w-full inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
                              Checkout
                            </span>
                          </div>
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-primary-semi-light hover:text-primary-light"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Continue Shopping<span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>)}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default dynamic(() => Promise.resolve(SideCart), { ssr: false });