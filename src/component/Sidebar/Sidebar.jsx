

import React from 'react'

import { userMenu } from '@/data/userMenu.js' ; 

// icons 
import { RxCross1 } from "react-icons/rx";


import Link from 'next/link';



const Sidebar = ({openSideBar , setOpenSideBar }) => {

     const userMenuData = userMenu ;
  
      // console.log(userMenuData)
    

  return (
   
    <div 
     className={`md:hidden  top-0 left-0 w-64 h-full shadow-lg bg-white fixed z-[9999]
              transition-transform duration-300 ease-in-out ${openSideBar ? "translate-x-0" : "-translate-x-full"}`}>   

      <div className='w-full  flex justify-between'>  

         <img src="/logo/brandNameLogo.svg" height={50}  width={100} alt="Kanvei Logo" />

        <button 
        className='pe-2 cursor-pointer'
         onClick={()=>setOpenSideBar(false)}
         >  
              <RxCross1
                    className={`text-[rgb(238,88,160)] font-bold text-2xl transition-all duration-1000 ease-in-out 
                        ${openSideBar ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-90'}`}
                    />
        </button>    
      </div>   

      <ul className=' w-full flex flex-col items-center justify-center  '>
        
          {
            userMenuData && userMenuData.map((el, index)=>{
                      return <li  
                              onClick={()=>setOpenSideBar(false)}
                             key={index}
                             className='w-full border-b-1 ps-3 py-3 border-gray-200
                               font-semibold
                              hover:bg-gray-200'>

                                <Link href={el.navi}  className='flex justify-start items-center gap-3 '>  
                                    {el.icon}
                                    <h1>{el.name.toUpperCase()}</h1> 
                               </Link>                            
                             </li> 

            })
          }
      </ul>
   
      
    </div>
  )
}

export default Sidebar
