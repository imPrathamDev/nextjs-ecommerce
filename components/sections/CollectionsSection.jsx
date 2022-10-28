import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function CollectionsSection({ collections }) {
  const data = collections?.collections.filter((c) => c.type === "Categories");
  return (
    <div className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none text-center">
          <h2 className="text-5xl font-BrownSugar font-normal text-primary">
            Explore Collections
          </h2>
          <p>Explore some product types which provide.</p>
        </div>
      </div>
      <div className="mt-10 py-4 px-6 space-y-12 flex gap-x-12 lg:space-y-0 overflow-x-scroll custom-scrollbar">
        {data.map((callout) => (
          <div
            key={callout.name}
            className="group relative flex flex-col even:flex-col-reverse"
          >
            <div className="relative w-60 h-60 bg-white rounded-lg overflow-hidden transition-all border-2 border-primary group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
              <Image
                src={callout.placeholder}
                layout="fill"
                width={500}
                height={500}
                className="object-center object-cover"
              />
            </div>
            <h3 className="my-6 text-lg text-gray-500 text-left transition-all group-hover:text-primary group-hover:my-2 font-Cinzel">
              <Link href={`/collections/${callout?.slug}`}>
                <span className="absolute inset-0" />
                {callout.name}
              </Link>
            </h3>
            {/* <p className="text-base font-semibold text-gray-900">{callout.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionsSection;
