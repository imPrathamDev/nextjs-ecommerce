import React from "react";
import NavBar from "../header/NavBar";
import Footer from "../footer/Footer";

const Layouts = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layouts;
