
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination, Autoplay } from "swiper";

const imgUrl = [
    { url: 'https://i.ibb.co/VWyfB3G/banner2.jpg' },
    { url: 'https://i.ibb.co/FWYxvv7/category-pizza.jpg' },
    { url: 'https://i.ibb.co/R24w3Fv/salad-bg.jpg' },
    { url: 'https://i.ibb.co/Brm2jt4/soup-bg.jpg' },
]

const Sweeper = () => {
    return (
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                  }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    imgUrl.map((img, index) => <SwiperSlide key={index}><img src={img.url} alt="" srcset="" /></SwiperSlide>)
                }
                
            </Swiper>
        </div>
    );
};

export default Sweeper;