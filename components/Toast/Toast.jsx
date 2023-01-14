import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Toast = ({ showToast, setShowToast }) => {
  useEffect(() => {
    if (!showToast.show) return;

    let timer = setTimeout(
      () => setShowToast((prev) => ({ ...prev, show: false })),
      1500
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
              scale: 0.2,
            }}
            animate={{
              y: 0,
              scale: 1,
            }}
            initial={{
              y: 100,
              scale: 0.2,
            }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-14 left-10 px-6 py-2 bg-primary-black rounded-lg z-50 box-shadow"
          >
            <span className="text-primary-white font-medium text-lg">
              {showToast.msg}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Toast;
