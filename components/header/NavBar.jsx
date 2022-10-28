import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SideCart from "../sections/SideCart";
import { CartState } from "../../context/Context";
import { useRouter } from "next/router";
import NavMenu from "./NavMenu";
import SearchModel from "../models/SearchModel";
import logo from "../../public/logo/logo-transparent-black.png";
import Image from "next/image";

function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartCount, setCartCount] = React.useState(0);
  const {
    state: { cartItems },
  } = CartState();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  return (
    <>
      <div className="px-4 py-3 mb-1 text-white bg-black">
        <p className="text-sm font-medium text-center">
          Wow our new season sale is live!
          <a
            className="underline font-Cinzel text-primary-light ml-1"
            href="/alpinejs"
          >
            {" "}
            Learn More &rarr;{" "}
          </a>
        </p>
      </div>

      <header className="border-b border-gray-200 sticky top-0 z-10 bg-primary-white/50 backdrop-blur-lg">
        <div className="flex items-center justify-between h-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 sm:mr-4 lg:hidden transition-colors duration-200 hover:text-primary"
              onClick={() => setIsOpen(true)}
            >
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
            {/* Mobile Menu */}
            <nav
              className={`sm:hidden block bg-primary-white fixed z-30 w-full h-[100vh] bottom-0 py-12 pl-4 duration-500 ${
                isOpen ? "left-0" : "left-[-100%]"
              } `}
            >
              <div className="flex items-center justify-between">
                <Link href="/">
                  <span className="flex">
                    <Image src={logo} height={30} width={80} className="" />
                  </span>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-4 h-8 w-8 text-primary transition-all hover:scale-105"
                  onClick={() => setIsOpen(false)}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <div className="px-4 py-6 flex flex-col gap-4">
                <Link href={"/"}>
                  <span
                    className={`block w-fit leading-10 border-b-4 border-transparent ${
                      router.asPath === "/"
                        ? "text-primary border-primary"
                        : "text-gray-500"
                    } hover:text-primary hover:border-current transition-all`}
                  >
                    Home
                  </span>
                </Link>
                <NavMenu router={router} />
              </div>
            </nav>

            <a href="/" className="flex">
              <img src={"/logo/logo-transparent-black.png"} className="h-16" />
            </a>
          </div>

          <div className="flex items-center justify-end flex-1">
            <nav className="hidden lg:text-gray-500 lg:tracking-wide lg:font-bold lg:text-sm lg:space-x-6 lg:flex">
              <Link href={"/"}>
                <span
                  className={`block h-full leading-[4rem] border-b-4 border-transparent ${
                    router.asPath === "/"
                      ? "text-primary border-primary"
                      : "text-gray-500"
                  } hover:text-primary hover:border-current transition-all`}
                >
                  Home
                </span>
              </Link>

              <NavMenu router={router} />

              <Link href={"/shop"}>
                <span
                  className={`block h-full leading-[4rem] border-b-4 border-transparent ${
                    router.asPath === "/shop"
                      ? "text-primary border-primary"
                      : "text-gray-500"
                  } hover:text-primary hover:border-current transition-all`}
                >
                  Shop
                </span>
              </Link>

              {/* <Link href={'/collections'}>
                <a className={`block h-full leading-[4rem] border-b-4 border-transparent ${router.asPath === '/collections' ? 'text-primary border-primary' : 'text-gray-500'} hover:text-primary hover:border-current transition-all`}>
                  Collections
                </a>
              </Link> */}

              <Link href={"/about-us"}>
                <span
                  className={`block h-full leading-[4rem] border-b-4 border-transparent ${
                    router.asPath === "/about-us"
                      ? "text-primary border-primary"
                      : "text-gray-500"
                  } hover:text-primary hover:border-current transition-all`}
                >
                  About Us
                </span>
              </Link>

              <Link href={"/contact"}>
                <li
                  className={`block h-full leading-[4rem] border-b-4 border-transparent ${
                    router.asPath === "/contact"
                      ? "text-primary border-primary"
                      : "text-gray-500"
                  } hover:text-primary hover:border-current transition-all`}
                >
                  Contact
                </li>
              </Link>
            </nav>
            <div className="flex items-center ml-8">
              <div className="flex items-center border-gray-100 divide-x divide-gray-100 border-x">
                <span>
                  <button
                    className="relative inline-block p-6 transform transition-all hover:scale-110 group"
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
                    <span className="absolute top-6 right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-black transform translate-x-1/2 -translate-y-1/2 group-hover:text-primary transition-all">
                      {cartCount}
                    </span>
                    <span className="sr-only">Cart</span>
                  </button>
                </span>

                <button
                  onClick={() => {
                    session?.user
                      ? router.push("/account")
                      : router.push("/login");
                  }}
                >
                  <span>
                    <div className="block p-6 transform transition-all hover:scale-110 group cursor-pointer">
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
                </button>

                <span className="hidden sm:block">
                  <button
                    onClick={() => setIsSearch(true)}
                    className="block p-6 transform transition-all hover:scale-110 group"
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
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <SideCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        <SearchModel isOpen={isSearch} setIsOpen={setIsSearch} />
      </header>
    </>
  );
}

export default NavBar;
