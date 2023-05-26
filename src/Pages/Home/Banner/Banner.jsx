import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const imgUrl = [
    { url: 'https://i.ibb.co/nmtD5fF/02.jpg' },
    { url: 'https://i.ibb.co/M1RQQNt/01.jpg' },
    { url: 'https://i.ibb.co/rcvKZwk/03.png' },
    { url: 'https://i.ibb.co/LPMhMNY/06.png' },
    { url: 'https://i.ibb.co/3NcVS6b/05.png' },
    { url: 'https://i.ibb.co/LN5SmRR/04.jpg' },
]

const Banner = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-60"
            >
                {
                    imgUrl.map((img, index) => <SwiperSlide key={index}><img src={img.url} alt="" srcset="" /></SwiperSlide>)
                }
            </Swiper>

        </div>
    );
};

export default Banner;