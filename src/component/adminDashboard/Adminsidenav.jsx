"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuShoppingCart, LuLayoutDashboard ,LuTrainTrack } from "react-icons/lu";
import { MdAddRoad, MdOutlineAddPhotoAlternate, MdFolderDelete , MdLocalShipping } from "react-icons/md";
import { BiMessageSquareEdit ,BiCommentX } from "react-icons/bi";
import { FaCommentMedical   } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { IoIosLogOut } from "react-icons/io";
import { CiImageOn, CiEdit } from "react-icons/ci";
import { TbDatabaseEdit } from "react-icons/tb";


const Adminsidenav = () => {

    const [showNavs, setShowNavs] = useState(false);

    const adminNavlist = [

        {
            title: "Dashboard",
            icon: <LuLayoutDashboard className='text-3xl inline mr-2'/> ,
            link  : "/admin/dashboard"
        },
        {
            title: "Product",
            icon: <MdAddRoad className='text-3xl inline mr-2'/> ,
            link  : "/admin/dashboard/product"
        }
        ,
        {
            title: "Add Product",
            icon: <MdOutlineAddPhotoAlternate className='text-3xl inline mr-2'/> ,
            link : "/admin/dashboard/add-product"
        }        
        ,
        {
            title: "Del Product",
            icon: <MdFolderDelete className='text-3xl inline mr-2'/>,
            link : "/admin/dashboard/del-product"
        }
        ,
        {
            title: "Edit Product",
            icon: <BiMessageSquareEdit className='text-3xl inline mr-2'/>,
            link : "/admin/dashboard/edit-product"
        }
                ,
        {
            title: "Track Order",
            icon: <LuTrainTrack className='text-3xl inline mr-2'/>,
            link : "/admin/dashboard/track-product"
        }
                ,
        {
            title: "Check All Order",
            icon: <MdLocalShipping className='text-3xl inline mr-2'/>,
            link : "/admin/dashboard/allorder-product"
        }
                ,
        {
            title: "DataBase Edit",
            icon: <TbDatabaseEdit className='text-3xl inline mr-2'/>,
            link : "/admin/dashboard/database-edit"
        }
                ,
        {
            title: "Add Comment",
            icon: <FaCommentMedical className='text-3xl inline mr-2'/>,
            link : "/admin/dashboard/add-comment"
        },

        {
            title: "Del Comment",
            icon: <BiCommentX className='text-3xl inline mr-2'/>,
            link  : "/admin/dashboard/del-comment"
        },
        {
            title: "Carousel",
            icon: <CiImageOn className='text-3xl inline mr-2'/> ,
            link  : "/admin/dashboard/carousel"
        },
        {
            title: "logOut",
            icon: <IoIosLogOut className='text-3xl inline mr-2'/> ,
            link :  "/admin/dashboard/logOut"
        },
    ]

    return (

        <div
            onMouseEnter={() => setShowNavs(true)}
            onMouseLeave={() => setShowNavs(false)}
            className ='mt-17 hidden md:block 
                 w-[90px] lg:hover:w-[220px] duration-300 transition-all
                 bg-[linear-gradient(to_bottom,_#833ab4,_#fd1d1d,_#fcb045)]
                 overflow-y-auto ' >     


            <ul>
                <li className='m-3 rounded  relative hover:bg-[#fcb045] p-1 px-2 font-semibold hover:text-black text-black' > 
                
              <button 
             
               className=''> <TiThMenu className='absolute top-0 right-3 mb-7 text-3xl inline mr-2'/> </button>
             </li>
             
                {
                    adminNavlist.length > 0 && adminNavlist.map((el, index) => {
                        return <li key={index} className='m-3 rounded hover:bg-[#fcb045] p-1 px-2 font-semibold hover:text-black text-white' >
                            <Link href={`${el.link}`}>
                               {el.icon}
                               { showNavs ? `${el.title}` : `` }</Link>
                        </li>
                    })
                }

            </ul>

        </div>
    )
}

export default Adminsidenav
