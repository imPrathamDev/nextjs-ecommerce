import React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CartState } from '../../context/Context'
import Link from 'next/link'
import Image from 'next/image'

const savedAddress = ["Pratham's Home Address", "My office address", "My Random Address"]

function Checkout() {
    const [ products, setProducts ] = React.useState([]);
    const [ selectedAddress, setSelectedAddress ] =  React.useState(savedAddress[0])
    const { state: { cartItems }, dispatch} = CartState();
    React.useEffect(() => {
        setProducts(cartItems);
    },[cartItems])

  return (
    <React.Fragment>
      <section className='overflow-hidden'>
        <div className='container px-5 pb-12 pt-8 mx-auto'>
        <div className='flex'>
        <div className='flex-1'>
        <h3 className='text-3xl font-semibold font-Cinzel mb-4'>
            Checkout
        </h3>
        <div className='px-4 py-2'>
        <h4 className='font-medium text-lg'>
        Contact information
        </h4>
        <div className='flex items-center mt-2'>
        <div className='h-10 w-10 rounded-full bg-slate-300'></div>
        <div className='ml-2 flex flex-col text-sm'>
            <p>Pratham Sharma(pratham.sharma21@gmail.com)</p>
            <span className='cursor-pointer text-primary-semi-light'>Logout</span>
        </div>
        </div>

        <div className='mt-10'>
        <h4 className='font-medium text-lg'>
        Shipping information
        </h4>

        {/*Creating Shipping Details Form*/}
        <div className='mt-4'>
        <Listbox>
        <Listbox.Button className="flex items-center text-left w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40">
        <div className='flex flex-col'>
            <span className='text-xs -mb-1'>Saved Address</span>
            <span className='text-base'>Use a new address</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </Listbox.Button>

        <Transition as={React.Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0' >
            <Listbox.Options className="border border-primary-black bg-white">
            {savedAddress.map((option, key) => 
            <Listbox.Option key={key} value={option} className={({ active }) => `bg-white text-sm font-medium ${active ? 'bg-primary-light' : 'bg-white'}`}>
                {option}
            </Listbox.Option>
            )}
            </Listbox.Options>
        </Transition>
        </Listbox>

        <Listbox>
        <Listbox.Button className="flex items-center text-left w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40">
        <div className='flex flex-col'>
            <span className='text-xs -mb-1'>Select Country</span>
            <span className='text-base'>India(Currently Only India is Available)</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </Listbox.Button>

        <Transition as={React.Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0' >
            <Listbox.Options className="border border-primary-black bg-white">
            {savedAddress.map((option, key) => 
            <Listbox.Option key={key} value={option} className={({ active }) => `bg-white text-sm font-medium ${active ? 'bg-primary-light' : 'bg-white'}`}>
                {option}
            </Listbox.Option>
            )}
            </Listbox.Options>
        </Transition>
        </Listbox>
        <div className='flex items-center justify-between gap-2'>
        <input type="text" name="firstname" id="firstname" placeholder="First Name" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
        <input type="text" name="lastname" id="lastname" placeholder="Last Name" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
        <input type="text" name="address" id="address" placeholder="Address" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
        <div className='flex items-center gap-2'>
        <input type="text" name="city" id="city" placeholder="City" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
        <Listbox>
        <Listbox.Button className="flex items-center text-left w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40">
        <div className='flex flex-col'>
            <span className='text-xs -mb-1'>Select State</span>
            <span className='text-base'>Rajasthan</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </Listbox.Button>

        <Transition as={React.Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0' >
            <Listbox.Options className="border border-primary-black bg-white">
            {savedAddress.map((option, key) => 
            <Listbox.Option key={key} value={option} className={({ active }) => `bg-white text-sm font-medium ${active ? 'bg-primary-light' : 'bg-white'}`}>
                {option}
            </Listbox.Option>
            )}
            </Listbox.Options>
        </Transition>
        </Listbox>
        <input type="number" name="pincode" id="pincode" placeholder="Pincode" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
        <input type="number" name="phone" id="phone" placeholder="Phone" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        </div>

        </div>
        </div>
        <div className='bg-white p-2 rounded-md'>
        <ul className='divide-y overflow-y-auto'>
            { products.map((product) => (
                <li key={product.id} className="flex py-4 group cursor-pointer">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={product.img}
                    alt={product.title}
                    className="h-full w-full object-cover object-center transform transition-all group-hover:scale-110"
                    width={'100%'}
                    height={'100%'}
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-primary-black">
                      <h3 className='font-Cinzel font-medium group-hover:underline'>
                        <Link href='/'>{product.title}</Link>
                      </h3>
                      <p className="ml-4">${product.price}</p>
                    </div>
                  <p className="mt-1 text-sm text-gray-500">Category Here</p>
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
            )) }
        </ul>

    <div className='mt-auto'>
        
    </div>

        </div>
        </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Checkout
