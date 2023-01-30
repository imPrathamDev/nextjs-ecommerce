import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import ProductCard from "../card/ProductCard";

function ProductSlider({ products }) {
  return (
    <>
      <section className="mx-8 px-8 py-6 my-16 bg-white rounded-md shadow-b-sm latestProducts">
        <div className="text-center">
          <h2 className="text-5xl font-BrownSugar font-normal text-primary">
            Latest Products
          </h2>
          <p>Explore some product types which provide.</p>
          <div className="mySwiper my-4">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                  spaceBetweenSlides: 10,
                },
                999: {
                  slidesPerView: 4,
                  spaceBetweenSlides: 20,
                },
              }}
              navigation
              modules={[Navigation, Pagination]}
              className="mx-auto px-6 py-4 text-primary xl:text-primary lg:text-primary"
              style={{
                "--swiper-theme-color": "#B09B71",
                "--swiper-navigation-size": "2rem",
              }}
            >
              {products.products.map((product) => (
                <SwiperSlide>
                  <ProductCard allData={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductSlider;
