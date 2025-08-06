'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import React from 'react';

const Images = [
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Premium Fashion Collection",
    description: "Discover the latest trends in fashion"
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    title: "Exclusive Accessories",
    description: "Complete your look with our curated accessories"
  },
  {
    src: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2115&q=80",
    title: "Summer Sale - Up to 70% Off",
    description: "Don't miss out on our biggest sale of the year"
  }
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
            <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[460px] overflow-hidden rounded-md">
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{img.title}</h2>
                  <p className="text-sm md:text-lg">{img.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
