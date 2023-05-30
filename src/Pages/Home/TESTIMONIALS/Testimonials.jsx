import React, { useEffect, useState } from 'react';
import SectionTitel from '../../Titel/SectionTitel';
import { Swiper, SwiperSlide } from "swiper/react";
import './testimonials.css'
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import { FaQuoteLeft } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
// FaQuoteLeft

const Testimonials = () => {
    const [review, setReview] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/reviews`).then(res => res.json()).then(data => {
            // console.log(data);
            setReview(data)
        })
    }, [])
    return (
        <div className='testimonialbg'>
            {/* ---What Our Clients Say--- */}
            <SectionTitel
                subheader={"---- What Our Clients Say ----"}
                header={"TESTIMONIALS"}
            ></SectionTitel> <br />

            <div className=" h-72">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                    {
                        review.map(swipItems => <SwiperSlide>
                            <div className="mx-32">
                                <Rating className='mx-auto'
                                    style={{ maxWidth: 180 }}
                                    value={swipItems.rating}
                                    readOnly
                                />
                                <p>{swipItems.rating}</p>
                                <FaQuoteLeft className='mx-auto text-4xl'></FaQuoteLeft>
                                <p className='my-3'>{swipItems.details}</p>
                                <p className='text-3xl text-yellow-500'>{swipItems.name}</p>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;