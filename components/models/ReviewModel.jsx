import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import StarsRating from 'react-star-rate';
import { toast, ToastContainer } from 'react-toastify';

const ReviewModel = ({ isOpen, setIsOpen, session, product }) => {
    const completeButtonRef = useRef(null)
    const [review, setReview] = useState({
        heading: '',
        rating: 0,
        review: ''
    });

    const handlerChange = (e) => {
        if (e.target.name === 'review') {
            setReview(prev => ({ ...prev, review: e.target.value }))
        } else if (e.target.name === 'heading') {
            setReview(prev => ({ ...prev, heading: e.target.value }))
        }
    }

    const handlerSubmit = () => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/reviews/addReviews`, {
            method: 'POST',
            body: JSON.stringify({
                user: session?.user?._id,
                product: product?._id,
                rating: review?.rating,
                review: review?.review,
                heading: review?.heading
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => {
            if (data?.success) {
                setReview({
                    heading: '',
                    rating: 1,
                    review: ''
                });
                toast.success('Review Added', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(data?.error, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }

    return (<>
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
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
                        <Dialog.Panel className="w-full max-w-lg transform overflow-hidden bg-primary-white ring-2 ring-primary p-6 text-left align-middle shadow-xl transition-all">
                            <div className='flex items-center'><Dialog.Title as="h3" className="text-lg font-semibold font-Cinzel leading-6 text-primary-black">Post Review</Dialog.Title>
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto h-6 w-6 text-primary-black hover:text-primary transition-all transform hover:rotate-180 cursor-pointer" onClick={() => setIsOpen(false)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>

                            <div className='mx-2 my-4'>
                                <div className='flex items-center gap-1'>
                                    <StarsRating
                                        value={review?.rating}
                                        defaultValue="1"
                                        onChange={value => {
                                            setReview(prev => ({ ...prev, rating: value }))
                                        }}
                                    />
                                    <h4 className='text-lg my-auto font-medium font-Cinzel'>{review?.rating}</h4>
                                </div>
                                <input type="text" name="heading" id="heading" placeholder="Review In One Line" value={review?.heading} onChange={handlerChange} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
                                <textarea type="text" rows="4" name="review" id="review" placeholder="Full Review" value={review?.review} onChange={handlerChange} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
                                <button onClick={handlerSubmit} className='ml-auto w-full text-end text-lg my-2 font-semibold font-Cinzel text-primary hover:underline'>
                                        Submit Review
                                </button>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    </>
    )
}

export default ReviewModel
