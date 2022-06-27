import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import PrimaryButton from '../buttons/PrimaryButton'

import { CartState } from '../../context/Context'

import emptyCart from '../../public/empty_cart.svg'


function SideCart({isCartOpen, setIsCartOpen}) {
  const { state: { cartItems }, dispatch } = CartState();
  const [total, setTotal] = useState('');

  useEffect(() => {
    setTotal(cartItems.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
  },[cartItems]);

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsCartOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsCartOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
                          </button>
                        </div>
                      </div>
                  {!cartItems.length > 0 && (<div className='w-full h-fit text-center flex flex-col mt-12 items-center justify-center'>
                      <Image src={emptyCart} width={'160px'} height={'200px'} className='my-2' />
                      <p className='text-lg font-medium'>Your Cart is Empty!</p>
                  </div>)}
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <Image
                                    src={product.img}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                    width={'100%'}
                                    height={'100%'}
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-primary-black">
                                      <h3>
                                        <Link href='/'>{product.title}</Link>
                                      </h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className='flex items-center gap-1 text-gray-500'>
                                    <button onClick={() => dispatch({
                                      type: 'CHANGE_QTY',
                                      payload: {
                                        id: product.id,
                                        qty: product.qty===1?1:product.qty-1
                                      }
                                    })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                    </svg>
                                    </button>
                                    <p className="">Qty {product.qty}</p>
                                    <button onClick={() => dispatch({
                                      type: 'CHANGE_QTY',
                                      payload: {
                                        id: product.id,
                                        qty: product.qty >= product.stock ? product.stock : product.qty+1
                                      }
                                    })}>
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
                                          payload: product
                                        })}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {cartItems.length > 0 && (<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-primary-black">
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6 text-center">
                        <PrimaryButton>
                          Checkout
                        </PrimaryButton>
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