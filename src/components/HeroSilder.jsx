import React from "react";
import { Link } from "react-router-dom";

// Swiper Components
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

// Swiper Modules
import { Pagination, Autoplay } from "swiper/modules";
// Iamges
import hero1 from "../img/banner_Hero1-removebg-preview.png";
import hero2 from "../img/banner_Hero2-removebg-preview.png";
import hero3 from "../img/banner_Hero3-removebg-preview.png";

/* =============================================================================
   Hero Slider Data
   -----------------------------------------------------------------------------
   Defines the promotional banners displayed in the homepage hero section.
============================================================================= */

const heroSlides = [
  {
    id: 1,
    image: hero1,
    title: "Microsoft Xbox 360 Controller",
  },
  {
    id: 2,
    image: hero2,
    title: "Microsoft Xbox 360 Controller",
  },
  {
    id: 3,
    image: hero3,
    title: "Microsoft Xbox 360 Controller",
  },
];

/* =============================================================================
   Hero Slider
   -----------------------------------------------------------------------------
   Displays the main promotional banners with autoplay and pagination.
============================================================================= */

function HeroSlider() {
  return (
    <section className="hero">
      <div className="container">
        <Swiper
          loop
          pagination
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {/* Promotional Content */}
              <div className="content">
                <h4>Introducing the New</h4>

                <h3>
                  {slide.title.split(" ").slice(0, 2).join(" ")}
                  <br />
                  {slide.title.split(" ").slice(2).join(" ")}
                </h3>

                <p>Windows XP / 7 / 8 / 10, PS3 & TV Box Compatible</p>

                <Link to="/" className="submit-btn">
                  Shop Now
                </Link>
              </div>

              {/* Hero Banner */}
              <img src={slide.image} alt={slide.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default HeroSlider;
