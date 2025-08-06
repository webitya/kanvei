import React from 'react'

const layout = ( {children } ) => {
  return (
    <div className='h-screen w-[100%] '> 
               
       <div className='flex  h-[100%] w-[100%] overflow-scroll' >  
            {children}
       </div>
       
             
    </div>
  )
}

export default layout
