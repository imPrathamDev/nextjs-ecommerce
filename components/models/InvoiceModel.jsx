import React, { Fragment, useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'

function InvoiceModel({ isOpen, setIsOpen }) {
    const completeButtonRef = useRef(null)
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
                        <Dialog.Panel className="w-full h-full transform overflow-hidden bg-primary-white ring-2 ring-primary p-6 text-left align-middle shadow-xl transition-all">
                            <div className='flex items-center'><Dialog.Title as="h3" className="text-lg font-semibold font-Cinzel leading-6 text-primary-black">Invoice</Dialog.Title>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto h-6 w-6 text-primary-black hover:text-primary transition-all transform hover:rotate-180 cursor-pointer" onClick={() => setIsOpen(false)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>

                            <div className='mx-2 my-4'>
                               
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default InvoiceModel
