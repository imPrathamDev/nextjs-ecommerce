import Link from "next/link";
import React from "react";
import ProductCard from "../card/ProductCard";

function FeatureCategory({ products }) {
  const category = {
    name: "Rings",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, cupiditate mollitia saepe vitae libero nobis.",
    link: "http://localhost:3000/collections/rings",
  };

  const categoryProducts = products.products.filter(
    (p) => p.category === category.name
  );
  categoryProducts.length = 3;

  return (
    <section>
      <div className="px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          <div className="flex items-center p-8 bg-gray-100 border-2 border-opacity-40 border-primary">
            <div className="mx-auto text-center lg:text-left">
              <h2 className="text-6xl font-normal font-BrownSugar text-primary">
                {category.name}
              </h2>

              <p className="mt-4 text-sm text-gray-700 max-w-[45ch]">
                {category.desc}
              </p>

              <Link href={`${category.link}`} as={category?.link}>
                <a className="inline-block px-6 py-3 mt-6 text-sm text-white bg-black rounded">
                  View the Range
                </a>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12">
            {categoryProducts.map((product) => (
              <ProductCard allData={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureCategory;
