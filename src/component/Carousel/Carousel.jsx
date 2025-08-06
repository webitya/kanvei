'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import React from 'react';

const Images = [
  "https://media.istockphoto.com/id/1585147665/vector/set-of-realistic-clothes-shoes-hats-yellow-items-of-men-and-women-wardrobe.jpg?s=1024x1024&w=is&k=20&c=496cYblLXdydsTJhNBPwnvhMig9EW9ELLxES5pKDmVQ=",
  "https://media.istockphoto.com/id/1195942083/photo/woman-neck-with-hand-with-many-bracelets.jpg?s=2048x2048&w=is&k=20&c=mxf4YrIlsfZoDGB39FWG2S_NbC_acY4T8qQV3IdHIOg=",
  "https://media.istockphoto.com/id/1542950663/vector/super-sale-banner-template-design-for-web-or-social-media-discount-25-off.jpg?s=2048x2048&w=is&k=20&c=0ZtPgP8QekHil0sG7TMQHZJ0I2WbAGDVmFDu42geB3w=",
  "https://plus.unsplash.com/premium_vector-1728305338802-7c9f8c2a52ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const Carousel = () => {
  return (
    <div className="relative z-0 w-full max-w-screen-xl mx-auto px-2 md:px-5 mt-3 shadow-md">

    {/* left button */}
       <div className="custom-prev absolute top-1/2 -translate-y-1/2 left-2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-200">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  </div>

  {/* 🡒 Right Button */}
  <div className="custom-next absolute top-1/2 -translate-y-1/2 right-2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-200">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>

      <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
            }}
            autoplay={{ delay: 3000 }}
            loop={true}
            slidesPerView={1}
            className="rounded-md"
      >
        {Images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[460px] flex justify-center items-center">
              <img
                src={img}
                alt={`slide-${i}`}
                className="max-h-full w-auto object-contain rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
