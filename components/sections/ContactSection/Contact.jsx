import React from "react";

const Contact = () => {
  return (
    <section className="p-0 bg-contact-bg bg-cover bg-center bg-no-repeat bg-fixed bg-black flex flex-col items-center justify-center">
      <div className="text-center px-12 lg:px-24 py-32 w-full h-full bg-primary-black/50">
        <div>
          <h2 className="text-5xl font-BrownSugar text-primary">
            Stay In Touch
          </h2>
          <p className="text-primary-white">
            Get our exclusive offers and latest updates about our products.
          </p>
          <div className="flex items-center justify-between px-8 py-3 bg-primary-white/60 backdrop-blur-sm rounded-full max-w-3xl mx-auto my-6 text-base lg:text-xl">
            <input
              type="text"
              name=""
              id="email"
              placeholder="Email here..."
              className="outline-none bg-transparent w-full placeholder:text-gray-500 text-primary-black"
            />
            <button className="font-Cinzel font-medium hover:text-primary hover:tracking-widest transition-all">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
