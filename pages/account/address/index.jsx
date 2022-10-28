import React, { useState, useRef, Fragment, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "../../../components/sections/NotFound";
import Layouts from "../../../components/layouts/Layouts";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const { user } = session;

  return {
    props: {
      user,
    },
  };
}

function Address({ user }) {
  console.log(user);
  const [data, setData] = useState({
    isOpen: false,
    action: "",
    addressId: "",
  });
  const [address, setAddress] = useState([]);
  const [changeTrigger, setChangeTrigger] = useState(false);
  const completeButtonRef = useRef(null);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [addressId, setAddressId] = useState(null);
  useEffect(() => {
    async function handlerGetAddresss() {
      const userAddress = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/address/getAddress`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: user?._id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());
      if (userAddress.success) {
        setAddress(userAddress?.address);
      }
    }
    handlerGetAddresss();
  }, [changeTrigger]);
  const handlerChange = (e) => {
    if (e.target.name === "firstname") {
      setNewAddress((prevState) => ({
        ...prevState,
        firstName: e.target.value,
      }));
    } else if (e.target.name === "lastname") {
      setNewAddress((prevState) => ({
        ...prevState,
        lastName: e.target.value,
      }));
    } else if (e.target.name === "address") {
      setNewAddress((prevState) => ({ ...prevState, address: e.target.value }));
    } else if (e.target.name === "city") {
      setNewAddress((prevState) => ({ ...prevState, city: e.target.value }));
    } else if (e.target.name === "state") {
      setNewAddress((prevState) => ({ ...prevState, state: e.target.value }));
    } else if (e.target.name === "pincode") {
      setNewAddress((prevState) => ({ ...prevState, pincode: e.target.value }));
    } else if (e.target.name === "phone") {
      setNewAddress((prevState) => ({ ...prevState, phone: e.target.value }));
    }
  };

  const handlerSubmit = async () => {
    if (
      newAddress?.firstName.length > 0 &&
      newAddress?.lastName.length > 0 &&
      newAddress?.address.length > 0 &&
      newAddress?.city.length > 0 &&
      newAddress?.state.length > 0 &&
      newAddress?.phone > 0
    ) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/address/addAddress`,
        {
          method: data?.action === "ADD_ADDRESS" ? "POST" : "PUT",
          body: JSON.stringify({
            userId: user?._id,
            firstName: newAddress?.firstName,
            lastName: newAddress?.lastName,
            address: newAddress?.address,
            city: newAddress?.city,
            state: newAddress?.state,
            pincode: newAddress?.pincode,
            phone: newAddress?.phone,
            addressId:
              data?.action === "UPDATE_ADDRESS" ? data?.addressId : null,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      if (response.success) {
        setNewAddress({
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          phone: "",
        });
        setChangeTrigger(!changeTrigger);
        setData((prev) => ({ ...prev, isOpen: false }));
        toast.success(
          data?.action === "ADD_ADDRESS" ? "Address Added!" : "Address Updated",
          {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        toast.error(response.error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Invalid Request trt", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handlerDelete = async (id) => {
    const deleteRes = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/address/addAddress`,
      {
        method: "DELETE",
        body: JSON.stringify({
          userId: user?._id,
          addressId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());

    if (deleteRes.success) {
      setChangeTrigger(!changeTrigger);
      toast.success("Address Deleted", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(deleteRes.error, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Layouts>
      <section className="px-4 py-12">
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
        <div className="mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-Cinzel font-semibold text-primary">
              My Address
            </h1>
          </div>
          <div className="flex justify-center">
            {address.length > 0 ? (
              <div className="w-full max-w-2xl">
                {address.map((addres) => (
                  <div
                    key={addres?._id}
                    className="text-base leading-6 bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border my-2 p-4"
                  >
                    <div className="">
                      <h4 className="text-lg font-semibold text-primary-black">
                        {addres?.firstName} {addres?.lastName}
                      </h4>
                      <p>{addres?.address}</p>
                      <p>
                        {addres?.city} ({addres?.pincode}), {addres?.state},{" "}
                        {addres?.country}
                      </p>
                      {addres.phone && <p>Phone: {addres?.phone}</p>}
                    </div>
                    <div className="w-full flex items-center justify-end gap-2 -mt-4 -mb-2 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setData((prevData) => ({
                            ...prevData,
                            isOpen: true,
                            action: "UPDATE_ADDRESS",
                            addressId: addres?._id,
                          }));
                          setNewAddress({
                            firstName: addres?.firstName,
                            lastName: addres?.lastName,
                            address: addres?.address,
                            city: addres?.city,
                            state: addres?.state,
                            pincode: addres?.pincode,
                            phone: addres?.phone,
                          });
                        }}
                        className="h-6 w-6 hover:text-primary transition-all transform hover:scale-110 hover:rotate-12 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handlerDelete(addres?._id)}
                        className="h-6 w-6 hover:text-red-500 transition-all transform hover:scale-110 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="my-8 text-center">
                <NotFound message={"Zero Address Found ^_^"} />
              </div>
            )}
          </div>
          <div className="mt-12 text-center">
            <button
              className="relative inline-block group cursor-pointer"
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  isOpen: true,
                  action: "ADD_ADDRESS",
                }))
              }
            >
              <span className="absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
              <span className="relative inline-block px-8 py-3 text-sm font-bold tracking-widest text-primary-black uppercase border-2 border-current group-active:text-opacity-75">
                Add New Address
              </span>
            </button>
          </div>

          <Transition appear show={data?.isOpen} as={Fragment}>
            <Dialog
              onClose={() =>
                setData((prevData) => ({ ...prevData, isOpen: false }))
              }
              className="relative z-50"
              initialFocus={completeButtonRef}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="fixed inset-0 backdrop-blur-sm bg-black/30 "
                  aria-hidden="true"
                />
              </Transition.Child>
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-primary-white ring-2 ring-primary p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex items-center">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold font-Cinzel leading-6 text-primary-black"
                      >
                        Add Address
                      </Dialog.Title>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-auto h-6 w-6 text-primary-black hover:text-primary transition-all transform hover:rotate-180 cursor-pointer"
                        onClick={() =>
                          setData((prev) => ({ ...prev, isOpen: false }))
                        }
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

                    <div className="m-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          placeholder="First Name"
                          value={newAddress?.firstName}
                          onChange={handlerChange}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                        />
                        <input
                          type="text"
                          name="lastname"
                          id="lastname"
                          placeholder="Last Name"
                          value={newAddress?.lastName}
                          onChange={handlerChange}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        value={newAddress?.address}
                        onChange={handlerChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="City"
                          value={newAddress?.city}
                          onChange={handlerChange}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                        />
                        <input
                          type="text"
                          name="state"
                          id="state"
                          placeholder="State"
                          value={newAddress?.state}
                          onChange={handlerChange}
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                        />
                        <input
                          type="number"
                          name="pincode"
                          id="pincode"
                          value={newAddress?.pincode}
                          onChange={handlerChange}
                          placeholder="Pincode"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                        />
                      </div>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                        value={newAddress?.phone}
                        onChange={handlerChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40 transition-all"
                      />

                      <button
                        className="relative w-full inline-block group cursor-pointer my-2"
                        onClick={handlerSubmit}
                      >
                        <span className="absolute w-full inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
                        <span className="relative w-full inline-block px-8 py-3 text-sm font-bold tracking-widest text-primary-black uppercase border-2 border-current group-active:text-opacity-75">
                          Submit Address
                        </span>
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>
      </section>
    </Layouts>
  );
}

export default Address;
