import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroSection from "./HeroSection";

const heroBanners = [
  {
    title: "Traditional Jewellery",
    secondaryTitle: "On Sriya.",
    url: "http://localhost:3000/",
    image: {
      url: "https://firebasestorage.googleapis.com/v0/b/replay-chat-dd920.appspot.com/o/j-images%2Fbanner%20(1).png?alt=media&token=8963b61f-bf65-4c95-b5ef-f9be13584397",
      alt: "Sriya",
    },
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, reprehenderit veniam molestias laudantium quasi sed neque laboriosam autem.",
    buttonTitle: "Shop Now",
  },
  {
    title: "New Collections",
    secondaryTitle: "On Sriya.",
    url: "http://localhost:3000/",
    image: {
      url: "https://firebasestorage.googleapis.com/v0/b/replay-chat-dd920.appspot.com/o/j-images%2Fbanner%20(2).png?alt=media&token=23fa4b19-2144-4171-9b8a-dc696ccf2327",
      alt: "Sriya",
    },
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, reprehenderit veniam molestias laudantium quasi sed neque laboriosam autem.",
    buttonTitle: "Shop Now",
  },
  {
    title: "Shop Rings",
    secondaryTitle: "On Sriya.",
    url: "http://localhost:3000/",
    image: {
      url: "https://firebasestorage.googleapis.com/v0/b/replay-chat-dd920.appspot.com/o/j-images%2Fbanner%20(3).png?alt=media&token=96fdfc5b-9ae0-4800-a890-ec8e0ef241d7",
      alt: "Sriya",
    },
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, reprehenderit veniam molestias laudantium quasi sed neque laboriosam autem.",
    buttonTitle: "Shop Rings",
  },
  {
    title: "Indian Collections",
    secondaryTitle: "On Sriya.",
    url: "http://localhost:3000/",
    image: {
      url: "https://firebasestorage.googleapis.com/v0/b/replay-chat-dd920.appspot.com/o/j-images%2Fbanner%20(4).png?alt=media&token=9e5e97cd-d2eb-4aa4-8f4e-91027014b904",
      alt: "Sriya",
    },
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, reprehenderit veniam molestias laudantium quasi sed neque laboriosam autem.",
    buttonTitle: "Shop Now",
  },
];

function HeroSlider() {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        style={{
          "--swiper-theme-color": "#B09B71",
          "--swiper-navigation-size": "2rem",
        }}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}
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
      </Swiper>
    </div>
  );
}

export default HeroSlider;
