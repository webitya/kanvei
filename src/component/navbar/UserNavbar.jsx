"use client"

import React from 'react'

// icons
import { IoMenu } from "react-icons/io5";
import {  AiFillHome,  AiOutlineHeart} from "react-icons/ai";
import { FaUserCircle} from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";


// components
import Sidebar from "@/component/Sidebar/Sidebar";
import { RxCross1 } from "react-icons/rx";


// hooks
import { useState, useEffect, useRef } from 'react';


const UserNavbar = () => {

  const [openSideBar, setOpenSideBar] = useState(false)


  useEffect(() => {

    const handleClickOutside = () => {

      openSideBar ? setOpenSideBar(false) : null;

    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };


  }, [openSideBar]);



  return (

    <div className='w-screen relative z-50 bg-white/30  shadow-md '>

      <div className='flex justify-between md:gap-5  items-center px-2 md:px-20'>


        {/* Menu Button here  IN Mobile screen md:hidden*/}
        <button
          className='cursor-pointer md:hidden'
          onClick={(e) => {
            e.stopPropagation();
            setOpenSideBar(!openSideBar)
          }}
        > <div className="relative h-8 w-8">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out 
      ${openSideBar ? 'opacity-0 scale-90 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
            >
              <IoMenu className='text-[rgb(238,88,160)] text-2xl font-bold' />
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out 
      ${openSideBar ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-90'}`}
            >
              <RxCross1 className='text-[rgb(238,88,160)] text-2xl font-bold' />
            </div>
          </div>

        </button>

        {/* this is logo  */}
        <img className='cursor-pointer'
        src="/logo/brandNameLogo.svg" height={50} width={100} alt="Kanvei Logo" />  
          
       <div className='relative w-[30%] md:w-[70%] '>
         <input type="text"
         className=' p-2 ps-8 border-s-0 border-e-0  w-full outline-0 border-gray-500 border  *
          bg-gradient-to-r from-white via-pink-100 to-white'
          placeholder='search Products'/>   
          <CiSearch  className=' text-2xl absolute top-[23%] start-1' />
     </div>
{/*   wishlist and Cart Here */}

        <div className=' flex items-center pe-3 justify-end text-gray-500  text-2xl gap-5'>  
          
            <button className='cursor-pointer flex flex-col justify-center items-center'>   <AiOutlineHeart  title='Wishlist Product' />
             <span className='text-sm hidden md:inline'> Wishlist </span>
             </button>

            <button className='hidden  cursor-pointer md:flex flex-col justify-center items-center '>   <FiShoppingBag title='Shopping Cart'/> 
            <span className='text-sm hidden md:inline'> Shopping </span> </button>

            <button className='cursor-pointer flex flex-col justify-center items-center'>   <FaUserCircle  title='Profile' /> 
             <span className='text-sm hidden md:inline'>Profile </span>
              </button>
            
        </div>




      </div>

      <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
    </div>
  )
}

export default UserNavbar ;
