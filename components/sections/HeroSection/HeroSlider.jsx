import HeroSection from "./HeroSection";
import { heroBanners } from "../../../static/staticData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

function HeroSlider() {
  return (
    <div>
      <Swiper
        className="relative group main-hero"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        modules={[Navigation, EffectFade, Autoplay]}
        effect="fade"
        navigation={{
          nextEl: ".swiper-next-button",
          prevEl: ".swiper-prev-button",
        }}
        pagination={{ el: ".swiper-pagination", type: "fraction" }}
        autoplay={{
          delay: 5000,
        }}
      >
        {heroBanners.map((item, key) => (
          <SwiperSlide key={key}>
            <HeroSection
              title={item?.title}
              secondaryTitle={item?.secondaryTitle}
              image={item?.image}
              desc={item?.desc}
              url={item?.url}
              buttonTitle={item?.buttonTitle}
            />
          </SwiperSlide>
        ))}
        <div className="absolute z-50 top-4 right-4">
          <span className="swiper-pagination"></span>
        </div>
        <div className="flex items-center gap-4 absolute bottom-6 right-6 z-50">
          <button className="h-14 w-14 bg-transparent rounded-full flex items-center justify-center border-2 border-primary-semi-light text-primary-semi-light transition-all hover:bg-primary-semi-light hover:text-primary-white hover:border-0 transform hover:scale-105 duration-500 translate-y-40 group-hover:translate-y-0 swiper-prev-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button className="h-14 w-14 bg-transparent rounded-full flex items-center justify-center border-2 border-primary-semi-light text-primary-semi-light transition-all hover:bg-primary-semi-light hover:text-primary-white hover:border-0 transform hover:scale-105 duration-300 translate-y-40 group-hover:translate-y-0 swiper-next-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </Swiper>
    </div>
  );
}

export default HeroSlider;
