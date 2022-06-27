import React from 'react'
import Link from 'next/link'

function Register() {
  return (
    <React.Fragment>
    <div className="">
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/3 relative">
              <video src={'https://firebasestorage.googleapis.com/v0/b/replay-chat-dd920.appspot.com/o/signup-bg.mp4?alt=media&token=bb3f9e5d-df36-4161-9cd7-872539ff950f'} autoPlay={true} loop={true} muted={true} className='absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100' />
                <div className="relative max-w-screen-xl flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-4xl font-bold font-Cinzel text-primary-light">Brand</h2>
                        
                        <p className="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold font-Cinzel text-center text-primary">Brand</h2>
                        
                        <p className="mt-3 text-gray-500">Register to becom member</p>
                    </div>

                    <div className="mt-8">
                        <form>

                        <div className='flex items-center justify-between gap-1 mb-4'>
                        <div>
                                <label htmlFor="firstname" className="block font-Cinzel font-medium mb-2 text-sm text-gray-600">First Name</label>
                                <input type="text" name="firstname" id="firstname" placeholder="Pratham" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                            <div>
                                <label htmlFor="lstname" className="block font-Cinzel font-medium mb-2 text-sm text-gray-600">Last Name</label>
                                <input type="text" name="lastname" id="lastname" placeholder="Sharma" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                        </div>

                            <div>
                                <label htmlFor="email" className="block font-Cinzel font-medium mb-2 text-sm text-gray-600">Email Address</label>
                                <input type="email" name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div className="mt-4">
                                <div className="mb-2">
                                    <label htmlFor="password" className="text-sm font-Cinzel font-medium text-gray-600">Password</label>
                                </div>

                                <input type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light  focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>

                            <div className="mt-6 w-full text-center">
                            <div className="relative w-full inline-block group focus:outline-none focus:ring cursor-pointer" href="/download">
                            <span className="absolute w-full inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
                            <span className="relative w-full inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
                            <Link href="/">Register Now</Link>
                            </span>
                            </div>
                            </div>

                        </form>

                        <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <Link href={'/login'}><span className="text-primary focus:outline-none focus:underline hover:underline cursor-pointer">Signin</span></Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </React.Fragment>
  )
}

export default Register
