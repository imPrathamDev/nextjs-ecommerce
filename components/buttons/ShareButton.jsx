import React, { Fragment, useRef, useState } from "react";
import { ShareIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import Image from "next/image";
import party from "party-js";
import { FiMail } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaTelegram, FaWhatsapp } from "react-icons/fa";
import StarCard from "../card/StarCard";

function ShareButton({ product }) {
  const url = `${process.env.NEXT_PUBLIC_HOST}/shop/${product?.slug}`;
  const [isOpen, setIsOpen] = useState(false);
  const completeButtonRef = useRef(null);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-gray-500 p-1 rounded-md hover:text-primary-white hover:bg-primary transition-all"
      >
        <ShareIcon className="w-4 h-4" />
        <p className="">Share</p>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
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
              className="fixed inset-0 backdrop-blur-sm bg-white/30 "
              aria-hidden="true"
            />
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
                <div className="flex items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold font-Cinzel leading-6 text-primary-black"
                  >
                    Share Now
                  </Dialog.Title>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-auto h-6 w-6 text-primary-black hover:text-primary transition-all transform hover:rotate-180 cursor-pointer"
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

                <div className="mx-2 my-4">
                  <div className="flex gap-x-2 p-2 rounded-md bg-white">
                    <Image
                      src={product?.images[0]?.url}
                      width={120}
                      height={120}
                      className="rounded-md"
                    />
                    <div className="flex flex-col justify-between">
                      <h4 className="font-Cinzel text-lg text-primary">
                        {product?.title}
                      </h4>
                      <span className="my-1 font-Cinzel">
                        ₹{product?.discPrice}{" "}
                        <span className="text-sm line-through">
                          ₹{product?.price}
                        </span>
                        <span className="flex items-center">
                          <StarCard rating={product?.rating} />
                          <span className="text-gray-600 ml-3">
                            {product?.numReviews} Reviews
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="mx-auto my-4 flex flex-wrap justify-center gap-1">
                    <EmailShareButton
                      url={url}
                      style={{ flex: "0 0 calc(16.66% - 20px)" }}
                    >
                      <div className="flex items-center gap-x-1 py-1 px-2 rounded-md transition-all hover:bg-white hover:text-primary">
                        <FiMail className="h-6 w-6" />
                        <span className="font-semibold">Mail</span>
                      </div>
                    </EmailShareButton>

                    <FacebookShareButton url={url}>
                      <div className="flex items-center gap-x-1 py-1 px-2 rounded-md transition-all hover:bg-white hover:text-primary">
                        <FaFacebook className="h-6 w-6" />
                        <span className="font-semibold">Facebook</span>
                      </div>
                    </FacebookShareButton>

                    <WhatsappShareButton url={url}>
                      <div className="flex items-center gap-x-1 py-1 px-2 rounded-md transition-all hover:bg-white hover:text-primary">
                        <FaWhatsapp className="h-6 w-6" />
                        <span className="font-semibold">WhatsApp</span>
                      </div>
                    </WhatsappShareButton>

                    <TelegramShareButton url={url}>
                      <div className="flex items-center gap-x-1 py-1 px-2 rounded-md transition-all hover:bg-white hover:text-primary">
                        <FaTelegram className="h-6 w-6" />
                        <span className="font-semibold">Telegram</span>
                      </div>
                    </TelegramShareButton>

                    <TwitterShareButton url={url}>
                      <div className="flex items-center gap-x-1 py-1 px-2 rounded-md transition-all hover:bg-white hover:text-primary">
                        <FaTwitter className="h-6 w-6" />
                        <span className="font-semibold">Twitter</span>
                      </div>
                    </TwitterShareButton>
                  </div>
                  <div className="">
                    <p className="mb-2">copy to clipboard:</p>
                    <span
                      id="copyURL"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(url)
                          .then(() => {
                            party.confetti(document.getElementById("copyURL"), {
                              count: party.variation.range(20, 40),
                              size: party.variation.range(0.8, 1.2),
                            });
                          })
                          .catch(() => {});
                      }}
                      className="p-2 bg-white rounded-md overflow-hidden truncate cursor-pointer border-2 border-transparent transition-all hover:bg-green-100 hover:border-green-500"
                    >
                      {url}
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ShareButton;
