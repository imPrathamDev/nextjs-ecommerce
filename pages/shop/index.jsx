import { Fragment, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RangeSlider from "../../components/sections/RangeSlider";
import ProductCard from "../../components/card/ProductCard";
import NotFound from "../../components/sections/NotFound";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  StarIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import Layouts from "../../components/layouts/Layouts";

const colTypesName = ["Categories", "Colours", "Style", "Stones"];
const newColTypesName = ["category", "color", "style", "stone"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps() {
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/getProducts?sort=new`
  ).then((res) => res.json());
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/collections/getCollections`
  ).then((res) => res.json());
  return {
    props: {
      products: products?.products,
      collections: collections?.collections,
    },
  };
}

function Shop({ products, collections }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [allProducts, setAllProducts] = useState(products);
  const [allFilter, setAllFilter] = useState([]);
  const filters = colTypesName.map((item) => ({
    id: item,
    name: item,
    options: collections
      .filter((p) => p.type === item)
      .map((type) => ({
        value: type?.slug,
        label: type?.name,
        checked: false,
      })),
  }));
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const sortOptions = [
    { name: "Newest" },
    { name: "Oldest" },
    { name: "Most Popular" },
    { name: "Best Rating" },
    { name: "Price: High to Low" },
    { name: "Price: Low to High" },
  ];
  const [currSort, setCurrSort] = useState({ name: "Newest" });
  const ratingList = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(1);
  const [values, setValues] = useState([
    products.length > 0
      ? Math.min(...products.map((item) => item?.discPrice))
      : 0,
    products.length > 0
      ? Math.max(...products.map((item) => item?.discPrice))
      : 1,
  ]);
  useEffect(() => {
    applyFilters();
    const allFilterFunc = () => {
      const allChecked = filters.map((item) => item.options);
      const checkedCollections = [];
      for (let v = 0; v < filters.map((item) => item.options).length; v++) {
        checkedCollections.push(...[...allChecked[v]]);
      }
      return checkedCollections;
    };
    setAllFilter(allFilterFunc());
  }, []);

  const handleChangeChecked = (value) => {
    const filtersStateList = allFilter;
    const changeCheckedFilters = filtersStateList.map((item) =>
      item.value === value ? { ...item, checked: !item.checked } : { ...item }
    );
    setAllFilter(changeCheckedFilters);
  };
  console.log("alllFunv", allFilter);
  const applyFilters = () => {
    let updatedList = products;

    //collections fillter
    const allCheckedFilters = allFilter
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());
    if (allCheckedFilters.length > 0) {
      for (let v = 0; v < newColTypesName.length; v++) {
        updatedList = updatedList.filter((item) => {
          return (
            allCheckedFilters.includes(item.category.toLowerCase()) ||
            allCheckedFilters.includes(item.stone.toLowerCase()) ||
            allCheckedFilters.includes(item.color.toLowerCase()) ||
            allCheckedFilters.includes(item.style.toLowerCase())
          );
        });
      }
    }

    //Rating Filter

    if (rating >= 1) {
      updatedList = updatedList.filter(
        (p) => p.rating >= rating || p.rating === 0
      );
    }

    //Price Filter
    updatedList = updatedList.filter(
      (p) => p.discPrice >= values[0] && p.discPrice <= values[1]
    );

    setAllProducts(updatedList);
  };

  const applySortProducts = () => {
    let tempList = products;
    if (currSort?.name === "Newest") {
      tempList.sort((a, b) => {
        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
      });
    } else if (currSort?.name === "Oldest") {
      tempList.sort((a, b) => {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      });
    } else if (currSort?.name === "Best Rating") {
      tempList.sort((a, b) => {
        return a.rating < b.rating ? 1 : -1;
      });
    } else if (currSort?.name === "Price: High to Low") {
      tempList.sort((a, b) => {
        return a.discPrice < b.discPrice ? 1 : -1;
      });
    } else if (currSort?.name === "Price: Low to High") {
      tempList.sort((a, b) => {
        return a.discPrice > b.discPrice ? 1 : -1;
      });
    } else if (currSort?.name === "Most Popular") {
      tempList.sort((a, b) =>
        new Date(a.createdAt) < new Date(b.createdAt)
          ? 1
          : -1 && a.rating < b.rating
          ? 1
          : -1
      );
    }

    setAllProducts(tempList);
  };

  useEffect(() => {
    applySortProducts();
    applyFilters();
  }, [allFilter, values, rating, currSort]);
  return (
    <Layouts>
      <div className="bg-primary-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
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
                <div className="fixed inset-0 bg-primary-black backdrop-blur-sm bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 flex z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                    <div className="px-4 flex items-center justify-between">
                      <h2 className="text-lg font-medium font-Cinzel text-primary-black">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <div className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      {products.length > 1 ? (
                        <div className="mx-4">
                          <h4 className="font-medium text-primary-black my-3">
                            Filter by Price
                          </h4>
                          <RangeSlider
                            values={values}
                            setValues={setValues}
                            MAX={
                              products.length > 0
                                ? Math.max(
                                    ...products.map((item) => item?.discPrice)
                                  )
                                : 1
                            }
                            MIN={
                              products.length > 0
                                ? Math.min(
                                    ...products.map((item) => item?.discPrice)
                                  )
                                : 0
                            }
                          />
                        </div>
                      ) : null}
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-primary-black">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusSmIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusSmIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}

                      <div className="mx-2 my-3">
                        <h4 className="font-medium text-primary-black my-3">
                          Filter by Ratings
                        </h4>
                        <div className="flex items-center gap-1 my-1">
                          {ratingList.map((item) => (
                            <button
                              key={item}
                              onClick={() => setRating(item)}
                              className={`py-1 px-2 rounded-md ${
                                rating === item
                                  ? "bg-primary-dark"
                                  : "bg-primary"
                              } text-primary-white flex items-center transition-all hover:bg-primary-dark`}
                            >
                              <span>{item}</span>
                              <StarIcon className="w-5 h-5" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex flex-col xl:flex-row lg:flex-row gap-y-2 items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold font-Cinzel tracking-tight text-primary-dark">
                Shop
              </h1>

              <div className="flex items-center ml-auto">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-primary-black">
                      Sort
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  option?.name === currSort?.name
                                    ? "font-semibold text-primary-black"
                                    : "font-medium text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                                onClick={() => setCurrSort(option)}
                              >
                                {option.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View grid</span>
                  <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <div className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  {products.length > 1 ? (
                    <div>
                      <h4 className="font-medium text-primary-black my-3">
                        Filter by Price
                      </h4>
                      <RangeSlider
                        values={values}
                        setValues={setValues}
                        MAX={
                          products.length > 0
                            ? Math.max(
                                ...products.map((item) => item?.discPrice)
                              )
                            : 1
                        }
                        MIN={
                          products.length > 0
                            ? Math.min(
                                ...products.map((item) => item?.discPrice)
                              )
                            : 0
                        }
                      />
                    </div>
                  ) : null}
                  {/* <ul role="list" className="text-sm font-medium text-primary-black space-y-4 pb-6 border-b border-gray-200">
                            {subCategories.map((category) => (
                                <li key={category.name}>
                                    <a href={category.href}>{category.name}</a>
                                </li>
                            ))}
                        </ul> */}

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-primary-black">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <AnimatePresence>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                              >
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 border-gray-300 rounded accent-primary-light text-primary focus:ring-indigo-500"
                                      onChange={(event) =>
                                        handleChangeChecked(option?.value)
                                      }
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </motion.div>
                            </AnimatePresence>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}

                  <h4 className="font-medium text-primary-black my-3">
                    Filter by Ratings
                  </h4>
                  <div className="flex items-center gap-1 my-1">
                    {ratingList.map((item) => (
                      <button
                        key={item}
                        onClick={() => setRating(item)}
                        className={`py-1 px-2 rounded-md ${
                          rating === item ? "bg-primary-dark" : "bg-primary"
                        } text-primary-white flex items-center transition-all hover:bg-primary-dark`}
                      >
                        <span>{item}</span>
                        <StarIcon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product grid */}
                <div className="lg:col-span-3 bg-white rounded-md">
                  {allProducts.length > 0 ? (
                    <motion.div
                      layout
                      variants={container}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 xl:grid-cols-3 gap-2 justify-center items-center"
                    >
                      <AnimatePresence>
                        {allProducts.map((product, key) => (
                          <motion.div
                            layout
                            variants={item}
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            key={key}
                            className="max-w-xs"
                          >
                            <ProductCard allData={product} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center">
                      <NotFound message={"Zero Product Found ^_^"} />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layouts>
  );
}

export default Shop;
