import { useState, Fragment, useRef, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import Link from 'next/link';

function SearchModel({ isOpen, setIsOpen }) {
    const completeButtonRef = useRef(null);
    const [search, setSearch] = useState([]);

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 500)
        }
    }

    const handlerChange = (e) => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/search?q=${e.target.value}`).then((res) => res.json()).then((data) => setSearch(data?.data));
    }

    const optimizeData = useCallback(debounce(handlerChange), []);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog onClose={() => setIsOpen(false)} className="relative z-50" initialFocus={completeButtonRef}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 " aria-hidden="true" />
                </Transition.Child>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95 transition-all transform translate-y-96"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 transition-all transform translate-y-0"
                        leaveTo="opacity-0 scale-95 transition-all transform translate-y-96"
                    >
                        <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden bg-primary-white ring-2 ring-primary p-6 text-left align-middle shadow-xl transition-all">
                            <div className='flex items-center'><Dialog.Title as="h3" className="text-lg font-semibold font-Cinzel leading-6 text-primary-black">Search Products</Dialog.Title>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto h-6 w-6 text-primary-black hover:text-primary transition-all transform hover:rotate-180 cursor-pointer" onClick={() => setIsOpen(false)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>

                            <div className='mx-2 my-4'>
                                <input name="search" id='search' type="text" placeholder='Search Products' onChange={optimizeData} className='w-full text-base p-2 rounded-md border-1 border-gray-50 outline-none text-primary-black ring-2 ring-gray-200 focus:ring-primary-semi-light transition-all focus:shadow-md' />
                                {search.length > 0 && (
                                    <div className='mt-2 max-h-52 overflow-y-auto custom-scrollbar'>
                                        {search.map(product => (
                                            <Link href={`/shop/${product?.slug}`} key={product?._id}>
                                                <a>
                                                    <div className='p-2 flex gap-2 my-1 w-full rounded-md bg-white hover:shadow-md transition-all cursor-pointer group'>
                                                        <div className='relative w-20 h-20 overflow-hidden'>
                                                            <Image src={product?.images?.[0]?.url} alt={product?.images?.[0]?.alt} layout="fill" className='object-center object-cover rounded-md' />
                                                        </div>
                                                        <div className='flex flex-col gap-1 justify-between h-full'>
                                                            <h3 className='text-lg font-medium font-Cinzel text-primary-black truncate mb-auto group-hover:text-primary group-hover:underline transition-all'>{product?.title}</h3>
                                                            <p className='text-lg font-medium mt-auto'>₹{product?.discPrice} <span className='text-base line-through'>₹{product?.price}</span></p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default SearchModel;
