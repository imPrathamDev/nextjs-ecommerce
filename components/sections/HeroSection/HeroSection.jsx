import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import PrimaryButton from "../../buttons/PrimaryButton";

function HeroSection({ image, title, secondaryTitle, desc, url, buttonTitle }) {
  return (
    <section className="relative bg-primary-white w-full">
      <Image
        className="absolute inset-0 object-[80%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
        src={image?.url}
        alt={image?.alt}
        blurDataURL={image?.url}
        placeholder="blur"
        layout="fill"
      />
      <div className="block inset-0 absolute bg-gradient-to-r from-primary-white to-transparent w-full h-full"></div>
      <div className="relative max-w-screen-xl px-4 py-24 lg:h-1/2 lg:items-center lg:flex mx-6">
        <div className="max-w-xl text-center sm:text-left">
          <motion.h1 className="text-3xl font-extrabold sm:text-5xl">
            {title}
            {secondaryTitle && (
              <strong className="font-BrownSugar font-normal text-primary sm:block my-1">
                {secondaryTitle}
              </strong>
            )}
          </motion.h1>

          <p className="max-w-xl mt-4 sm:leading-relaxed sm:text-lg">{desc}</p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-8 text-center">
            <PrimaryButton href={url}>{buttonTitle}</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
