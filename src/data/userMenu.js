


import {
  AiFillHome,
  AiOutlineHeart
} from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import {
  FaBlogger,
  FaInfoCircle,
  FaUserCircle
} from "react-icons/fa";
import {
  MdWork,
  MdContacts,
  MdCompareArrows
} from "react-icons/md";


 export const userMenu = [
  
  { name: "Home", navi: "/home", icon: <AiFillHome className="text-2xl" /> },
  { name: "Shop", navi: "/shop", icon: <FiShoppingBag className="text-2xl" /> },
  { name: "Blog", navi: "/blog", icon: <FaBlogger className="text-2xl" /> },
  { name: "Portfolio", navi: "/portfolio", icon: <MdWork className="text-2xl" /> },

  { name: "Contact us", navi: "/contact", icon: <MdContacts className="text-2xl" /> },
  { name: "Wishlist", navi: "/wishlist", icon: <AiOutlineHeart className="text-2xl" /> },
  { name: "Compare", navi: "/compare", icon: <MdCompareArrows className="text-2xl" /> },
    { name: "About us", navi: "/about", icon: <FaInfoCircle className="text-2xl" /> },
  { name: "Login / Register", navi: "/login", icon: <FaUserCircle className="text-2xl" /> },
];

