import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SideCart from "../sections/SideCart";
import { CartState } from "../../context/Context";
import { useRouter } from "next/router";
import SearchModel from "../models/SearchModel";
import Image from "next/image";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const {
    state: { cartItems },
  } = CartState();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [navigation, setNavigation] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  const colTypesName = ["Categories", "Colours", "Style", "Stones"];

  async function fetchCollections() {
    const data = await fetch(
      process.env.NEXT_PUBLIC_HOST + "/api/collections/getCollections"
    ).then((response) => response.json());
    if (data.success) {
      setNavigation({
        categories: [
          {
            id: "collections",
            name: "Collections",
            featured: [
              {
                name: "New Arrivals",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
                imageAlt:
                  "Models sitting back to back, wearing Basic Tee in black and bone.",
              },
              {
                name: "Basic Tees",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
                imageAlt:
                  "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
              },
            ],
            sections: colTypesName.map((item) => ({
              id: item.toLowerCase(),
              name: item,
              items: data.collections.filter(
                (t) => t.type.toLowerCase() === item.toLowerCase()
              ),
            })),
          },
        ],
        pages: [
          { name: "Shop", href: "/shop" },
          { name: "About Us", href: "/about-us" },
          { name: "Contact", href: "/contact" },
        ],
      });
    }
  }

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <>
      <div className="px-4 py-3 mb-1 text-white bg-primary-black">
        <p className="text-sm font-medium text-center">
          Wow our new season sale is live!
          <Link href={"/offers"}>
            <a className="underline font-Cinzel text-primary-light ml-1">
              {" "}
              Learn More &rarr;{" "}
            </a>
          </Link>
        </p>
      </div>

      <header className="border-b border-gray-200 sticky top-0 z-20 bg-primary-white/50 backdrop-blur-lg">
        <div className="flex items-center justify-between h-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 sm:mr-4 lg:hidden transition-colors duration-200 hover:text-primary"
              onClick={() => setOpen(true)}
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
            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                      <div className="flex px-4 pt-5 pb-2">
                        <button
                          type="button"
                          className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Links */}
                      <Tab.Group as="div" className="mt-2">
                        <div className="border-b border-gray-200">
                          <Tab.List className="-mb-px flex space-x-8 px-4">
                            {navigation &&
                              navigation.categories.map((category) => (
                                <Tab
                                  key={category.name}
                                  className={({ selected }) =>
                                    classNames(
                                      selected
                                        ? "text-primary border-primary"
                                        : "text-gray-600 border-transparent",
                                      "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                                    )
                                  }
                                >
                                  {category.name}
                                </Tab>
                              ))}
                          </Tab.List>
                        </div>
                        <Tab.Panels as={Fragment}>
                          {navigation &&
                            navigation.categories.map((category) => (
                              <Tab.Panel
                                key={category.name}
                                className="space-y-10 px-4 pt-10 pb-8"
                              >
                                <div className="grid grid-cols-2 gap-x-4">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative text-sm"
                                    >
                                      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                        <img
                                          src={item.imageSrc}
                                          alt={item.imageAlt}
                                          className="object-cover object-center"
                                        />
                                      </div>
                                      <Link href={item.href}>
                                        <div className="mt-6 block font-medium text-gray-900">
                                          <span
                                            className="absolute inset-0 z-10"
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                        </div>
                                      </Link>
                                      <p aria-hidden="true" className="mt-1">
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${category.id}-${section.id}-heading-mobile`}
                                      className="font-BrownSugar font-semibold text-primary-dark text-xl tracking-wider"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                      className="mt-6 flex flex-col space-y-6"
                                    >
                                      {section.items.map((item) => (
                                        <li
                                          key={item.name}
                                          className="flow-root"
                                        >
                                          <a
                                            href={`/collections/${item.slug}`}
                                            className="-m-2 block p-2 text-gray-500"
                                          >
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </Tab.Panel>
                            ))}
                        </Tab.Panels>
                      </Tab.Group>

                      <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                        {navigation &&
                          navigation.pages.map((page) => (
                            <div key={page.name} className="flow-root">
                              <a
                                href={page.href}
                                className="-m-2 block p-2 font-medium text-gray-900"
                              >
                                {page.name}
                              </a>
                            </div>
                          ))}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <Link href="/">
              <a>
                <img src={"/logo/logo-transparent.svg"} className="h-16" />
              </a>
            </Link>
          </div>

          <div className="flex items-center justify-end flex-1">
            <nav className="hidden lg:text-gray-500 lg:tracking-wide lg:font-bold lg:text-sm lg:space-x-6 lg:flex">
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <Link href={"/"}>
                    <a
                      className={`block h-full leading-[4rem] border-b-4 border-transparent ${
                        router.asPath === "/"
                          ? "text-primary border-primary"
                          : "text-gray-500"
                      } hover:text-primary hover:border-current transition-all`}
                    >
                      Home
                    </a>
                  </Link>
                  {navigation &&
                    navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? "text-primary border-primary"
                                    : "border-transparent text-gray-500",
                                  "relative z-10 flex items-center border-b-4 pt-px text-sm font-semibold hover:text-primary hover:border-current transition-all outline-none"
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div
                                  className="absolute inset-0 top-1/2 bg-primary-white shadow"
                                  aria-hidden="true"
                                />

                                <div className="relative bg-primary-white">
                                  <div className="mx-auto px-16">
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div
                                            key={item.name}
                                            className="group relative text-base sm:text-sm"
                                          >
                                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center"
                                              />
                                            </div>
                                            <a
                                              href={item.href}
                                              className="mt-6 block font-medium text-gray-900"
                                            >
                                              <span
                                                className="absolute inset-0 z-10"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </a>
                                            <p
                                              aria-hidden="true"
                                              className="mt-1"
                                            >
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-4 gap-y-10 gap-x-8 text-sm">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p
                                              id={`${section.name}-heading`}
                                              className="font-BrownSugar font-semibold text-primary-dark text-xl"
                                            >
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li
                                                  key={item.name}
                                                  className="flex"
                                                >
                                                  <a
                                                    href={
                                                      "/collections/" +
                                                      item.slug
                                                    }
                                                    className="hover:text-primary transition-all hover:tracking-widest"
                                                  >
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}
                  <Link href={"/shop"}>
                    <a
                      className={`block h-full leading-[4rem] border-b-4 border-transparent ${
                        router.asPath === "/shop"
                          ? "text-primary border-primary"
                          : "text-gray-500"
                      } hover:text-primary hover:border-current transition-all`}
                    >
                      Shop
                    </a>
                  </Link>

                  <Link href={"/about-us"}>
                    <a
                      className={`block h-full leading-[4rem] border-b-4 border-transparent ${
                        router.asPath === "/about-us"
                          ? "text-primary border-primary"
                          : "text-gray-500"
                      } hover:text-primary hover:border-current transition-all`}
                    >
                      About Us
                    </a>
                  </Link>

                  <Link href={"/contact"}>
                    <a
                      className={`block h-full leading-[4rem] border-b-4 border-transparent ${
                        router.asPath === "/contact"
                          ? "text-primary border-primary"
                          : "text-gray-500"
                      } hover:text-primary hover:border-current transition-all`}
                    >
                      Contact
                    </a>
                  </Link>
                </div>
              </Popover.Group>

              {/* <NavMenu /> */}
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
