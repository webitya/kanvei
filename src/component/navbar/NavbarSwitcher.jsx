
"use client"

import React from 'react' ;
import { usePathname } from 'next/navigation';
import UserNavbar from './UserNavbar';
import AdminNav from './AdminNavbar';


const NavbarSwitcher = () => { 
       
     let path = usePathname() ;
     
   const  isPath =  path.startsWith("/admin") ;

  return  isPath ? <AdminNav/> :  <UserNavbar/>
}

export default NavbarSwitcher
