"use client"
import React, { useState } from 'react' ;
  

const page = () => {
  
        const [variant, setvariants] = useState([]) 

        const addvariant = ()=>{ 
            setvariants([...variant , {} ])
        }

        

  return (
    <div>
           
             {
                  variant.map((el, index)=>{
                        return  <input  
                         className='border'
                          key={index}
                          type='text' 

                          /> 
                  })
             }

             <button 
             onClick={addvariant}
              >add Variant</button>

    </div>
  )



  

}

export default page  ;
