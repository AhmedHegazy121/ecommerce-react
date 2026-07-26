import React from "react";

// Components
import Product from "./Product";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";

// Component Styles
import "./slideProduct.css";

/* =============================================================================
   Slide Product
   -----------------------------------------------------------------------------
   Displays a responsive product carousel using Swiper.
   The component receives a section title and an array of products,
   then renders each product inside a slide.
============================================================================= */

function SlideProduct({ title, data }) {
  return (
    <section className="slide_products slide">
      <div className="container">
        {/* ======================== Section Header ======================== */}
        <div className="top_slide">
          <h2>{title}</h2>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
            veniam!
          </p>
        </div>

        {/* ======================= Product Carousel ======================= */}
        <Swiper
          className="mySwiper"
          modules={[Navigation, Autoplay]}
          navigation
          loop={data.length >= 5}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          /* RESPONSIVE LAYOUT CONSTRAINTS */
          slidesPerView={1}
          spaceBetween={30} /* 1. Increased base space from 20 to 30 */
          breakpoints={{
            // Large Mobile Screens
            480: {
              slidesPerView: 2,
              spaceBetween: 25 /* 2. Increased to 25px */,
            },
            // Tablet Screen Sizes
            768: {
              slidesPerView: 3,
              spaceBetween: 30 /* 3. Increased to 30px */,
            },
            // Small Monitors
            1024: {
              slidesPerView: 4,
              spaceBetween: 30 /* 4. Increased to 30px */,
            },
            // Wide Desktop Screens
            1280: {
              slidesPerView: 5,
              spaceBetween: 35 /* 5. Increased to 35px for wide screens */,
            },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Product item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SlideProduct;
