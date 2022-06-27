import React, { useEffect } from 'react'
import Link from 'next/link'
import SideCart from './SideCart';

import { CartState } from '../../context/Context'

function NavBar() {
  const [ cartCount, setCartCount ] = React.useState(0); 
  const { state: { cartItems } } = CartState();
  const [isCartOpen, setIsCartOpen] = React.useState(false)

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }


  useEffect(() => {
    setCartCount(cartItems.length);
  },[cartItems])

  return (
    <>
    <div className="px-4 py-3 mb-1 text-white bg-black">
    <p className="text-sm font-medium text-center">
        Wow our new season sale is live!
        <a className="underline font-Cinzel text-primary-light ml-1" href="/alpinejs"> Learn More &rarr; </a>
    </p>
    </div>
    <header className="border-b border-gray-200">
  <div
    className="flex items-center justify-between h-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8"
  >
    <div className="flex items-center">
      <button type="button" className="p-2 sm:mr-4 lg:hidden">
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <a href="" className="flex">
        <span className="inline-block w-32 h-10 bg-gray-200 rounded-lg"></span>
      </a>
    </div>

    <div className="flex items-center justify-end flex-1">
      <nav
        className="hidden lg:uppercase lg:text-gray-500 lg:tracking-wide lg:font-bold lg:text-xs lg:space-x-4 lg:flex"
      >

        <Link href={'/'}>
        <a
          className="block h-full leading-[4rem] border-b-4 border-transparent hover:text-primary hover:border-current transition-all"
        >
          About
        </a>
        </Link>

        <Link href={'/'}>
        <a
          className="block h-full leading-[4rem] border-b-4 border-transparent hover:text-primary hover:border-current transition-all"
        >
          News
        </a>
        </Link>

        <Link href={'/'}>
        <a
          className="block h-full leading-[4rem] border-b-4 border-transparent hover:text-primary hover:border-current transition-all"
        >
          Products
        </a>
        </Link>

        <Link href={'/'}>
        <a
          className="block h-full leading-[4rem] border-b-4 border-transparent hover:text-primary hover:border-current transition-all"
        >
          Contact
        </a>
        </Link>
      </nav>

      <div className="flex items-center ml-8">
        <div
          className="flex items-center border-gray-100 divide-x divide-gray-100 border-x"
        >
          <span>
            <button
              className="relative inline-block block p-6 border-b-4 border-transparent hover:border-primary group"
              onClick={handleCartOpen}
            >
              <svg
                className="w-4 h-4 group-hover:text-primary transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className='absolute top-6 right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-black transform translate-x-1/2 -translate-y-1/2 group-hover:text-primary transition-all'>{cartCount}</span>
              <span className="sr-only">Cart</span>
            </button>
          </span>

          <Link href={'/login'} >
          <span>
            <div
              
              className="block p-6 border-b-4 border-transparent hover:border-primary group transition-all cursor-pointer"
            >
              <svg
                className="w-4 h-4 group-hover:text-primary transition-all"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <span className="sr-only"> Account </span>
            </div>
          </span>
          </Link>

          <span className="hidden sm:block">
            <a
              href="/search"
              className="block p-6 border-b-4 border-transparent hover:border-primary group"
            >
              <svg
                className="w-4 h-4 group-hover:text-primary transition-all"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <span className="sr-only"> Search </span>
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
  {isCartOpen && (<SideCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />)}
</header>
    </>
  )
}

export default NavBar
