import React from "react";
import placeholder from "../../public/test-placeholder.png";

const FeatureCategories = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto">
          <div>
            <h1 className="text-3xl">Your Library</h1>
            <p className="mt-2 text-gray-600">
              Listen to your favorite music today !
            </p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="relative flex flex-col justify-end overflow-hidden rounded-b-xl pt-6">
              <div className="group relative flex cursor-pointer justify-between rounded-xl bg-primary-light before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-primary before:opacity-0 before:transition before:duration-500 hover:before:opacity-100">
                <div className="relative  space-y-1 p-4">
                  <h4 className="text-lg text-primary-dark">Smooth Criminal</h4>
                  <div className="relative h-6 text-primary-dark text-sm">
                    <span className="transition duration-300 group-hover:invisible group-hover:opacity-0">
                      Michael Jackson
                    </span>
                    <a
                      href=""
                      className="flex items-center gap-3 invisible absolute left-0 top-0 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0"
                    >
                      <span>Listen now </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 -translate-x-4 transition duration-300 group-hover:translate-x-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <img
                  className="absolute z-50 -bottom-1 right-0 w-[9rem] transition duration-300 group-hover:scale-[1.4]"
                  src="https://firebasestorage.googleapis.com/v0/b/replay-chat-dd920.appspot.com/o/test-placeholder.png?alt=media&token=d60dd20c-e70a-443a-9dcf-10cdda94aae3"
                  alt=""
                />
              </div>
            </div>

            <div className="relative -mr-6 flex flex-col justify-end overflow-hidden rounded-b-xl pt-6 pr-6">
              <div className="group relative flex cursor-pointer justify-between rounded-xl bg-orange-200 before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:rounded-r-xl before:bg-gradient-to-r before:from-transparent before:to-orange-600 before:opacity-0 before:transition before:duration-500 hover:before:opacity-100">
                <div className="relative space-y-1 p-4">
                  <h4 className="text-lg text-orange-900">Ice Cream</h4>
                  <div className="relative h-6 text-orange-800 text-sm">
                    <span className="transition duration-300 group-hover:invisible group-hover:opacity-0">
                      Selena Gomez
                    </span>
                    <a
                      href=""
                      className="w-max flex items-center gap-3 invisible absolute left-0 top-0 translate-y-3 transition duration-300 group-hover:visible group-hover:translate-y-0"
                    >
                      <span>Listen now </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 -translate-x-4 transition duration-300 group-hover:translate-x-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <img
                  className="absolute -bottom-1 right-0 w-[7rem] transition duration-300 group-hover:scale-[1.4]"
                  src="https://firebasestorage.googleapis.com/v0/b/replay-chat-dd920.appspot.com/o/test-placeholder.png?alt=media&token=d60dd20c-e70a-443a-9dcf-10cdda94aae3"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCategories;
