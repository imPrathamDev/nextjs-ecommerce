import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Toast = ({ showToast, setShowToast }) => {
  function Timer(callback, delay) {
    let timerId,
      start,
      remaining = delay;

    this.pause = function () {
      window.clearTimeout(timerId);
      timerId = null;
      remaining -= Date.now() - start;
    };

    this.resume = function () {
      if (timerId) {
        return;
      }

      start = Date.now();
      timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
  }

  // var timer = new Timer(function () {
  //   alert("Done!");
  // }, 1000);

  let timer;

  useEffect(() => {
    if (!showToast.show) return;

    timer = new Timer(
      () => setShowToast((prev) => ({ ...prev, show: false })),
      3000
    );
    return () => {
      clearTimeout(timer);
    };
  }, [showToast.show]);
  return (
    <>
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            exit={{
              y: 100,
              opacity: 0.5,
            }}
            animate={{
              y: 0,
            }}
            initial={{
              y: 100,
            }}
            onMouseEnter={() => {
              if (timer) timer.pause();
            }}
            onMouseLeave={() => {
              if (timer) timer.resume();
            }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-12 left-12 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl"
            style={{ zIndex: "9999" }}
          >
            <div
              className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg animate-bounce ${
                showToast.error
                  ? "text-red-500 bg-red-100"
                  : "text-green-500 bg-green-100"
              }`}
            >
              {showToast.error ? (
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
              <span className="sr-only">
                {showToast.error ? "Cross icon" : "Check icon"}
              </span>
            </div>
            <div className="ml-3 text-sm font-bold cursor-default">
              {showToast.msg}
            </div>
            <button
              type="button"
              onClick={() => {
                setShowToast({
                  show: false,
                });
                clearTimeout(timer);
              }}
              className="ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-primary-black rounded-lg p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Toast;
