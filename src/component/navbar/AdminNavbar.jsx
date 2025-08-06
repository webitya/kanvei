import React from 'react' ;
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const AdminNav = () => {
  return (
    <div className=' 
    absolute top-0 w-[100%]
    flex items-center justify-between px-4 backdrop-blur-md  bg-[linear-gradient(to_right,_#833ab4,_#fd1d1d,_#fcb045)] border-white/20 '> 

            {/* logo in top  */}
            
            <div> 
                <img
                className="dark:invert"
                src="/BrandLogo.png"
                alt="Brand logo"
                width={70}
                height={70}
            //  priority
            />
            </div>  

            {/* search and profile  */}
            
            <div className='w-[50%] flex gap-1 items-center'>

             <input type="text" 
               placeholder='search Users'
              className='w-[100%] border-gray-200 border-2 
               text-base outline-0 hover:border-3
              text-white  p-2 rounded border-e-0 ' /> 
             <button className='border p-2   rounded'><FaSearch className='text-2xl'/></button>  
             </div>

            <div className='w-[30%] flex justify-between pe-5'> 
                  
                   <p>Role</p> 
                   <button className='flex items-center' > <CiLight className='text-3xl' />  <MdDarkMode className='text-3xl' /> </button> 
                   <button
                   className='cursor-pointer' 
                     >
                     <FaRegUserCircle className='text-3xl' />
                   </button>
                    
            </div>
                     

             
              
    </div>
  )
}

export default AdminNav
