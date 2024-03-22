
"use client"
import React, { useState } from 'react';
import { MdDashboard, MdSportsBasketball } from "react-icons/md";
import { FaUsers, FaUserFriends } from "react-icons/fa";
import { ReactNode } from 'react';
import Link from 'next/link';
import { PiNotebookBold } from "react-icons/pi";
import { RiCustomerServiceFill } from "react-icons/ri"
import { TbDiscount2, TbMessageHeart, TbArrowsRandom } from "react-icons/tb";
import { IoIosMenu, IoMdClose, IoIosSettings } from "react-icons/io";
import Image from 'next/image';

interface MenuItem {
  title: string;
  path: string;
  icon?: ReactNode;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard size={20} />,
  },
  {
    title: "Ground",
    path: "/ground",
    icon: <TbArrowsRandom size={20} />
  },
  {
    title: "Booking",
    path: "/booking",
    icon: <PiNotebookBold size={20} />
  },
  {
    title: "Users",
    path: "/users",
    icon: <FaUserFriends size={20} />
  },
  {
    title: "Sports",
    path: "/sports",
    icon: <MdSportsBasketball size={20} />
  },
  {
    title: "Services",
    path: "/services",
    icon: <RiCustomerServiceFill size={20} />
  },
  {
    title: "Coupon",
    path: "/coupon",
    icon: <TbDiscount2 size={20} />
  },
  {
    title: "Testimonials",
    path: "/testimonials",
    icon: <TbMessageHeart size={20} />
  },
  {
    title: "Setting",
    path: "/setting",
    icon: <IoIosSettings size={20} />
  }
];
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={toggleSidebar} className="md:hidden">
        {isOpen ? <IoMdClose size={20} /> : <IoIosMenu size={20} />}
      </button>
      <div className={`p-3 ${isOpen ? "block" : "hidden"} md:p-2  md:block h-screen`}>
        <div className='md:top-2 md:sticky md:bg-[#59D5E0] md:p-2 md:shadow-md rounded-md flex items-center'>
          <Link href="/admin" className='flex items-center'>
            <Image src="https://pitplay.in/assets/img/logo.png" width={100} height={100} alt="Logo" className='w-12 mr-2' />
            <h2 className='font-bold'>PITPLAY</h2></Link>
        </div>
        <ul className='my-2'>
          {menuItems.map((cat) => (
            <li key={cat.title} className='hover:bg-[#aae1e6] rounded-md p-3 cursor-pointer md:p-4'>
              <Link className='flex items-center p-2' href={`/admin/${cat.path}`}>
                <div className="mr-1">{cat.icon}</div>
                <div>{cat.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
{/* <div className="flex flex-col  p-5">
<Link href="/admin" className='mb-4 w-12 flex items-center '>
  <Image src="https://pitplay.in/assets/img/logo.png" width={100} height={100} alt="Logo"/>
  <h3 className='font-bold text-xl ml-3 '>PitPlay</h3></Link>
<ul>
  {menuItems.map((cat) => (
    <li key={cat.title}>
      <Link className={`p-4 mb-1 flex items-center hover:bg-[#5d87ff] hover:text-white rounded-md `} href={`/admin/${cat.path}`}>
        <div className="mr-4 ">{cat.icon}</div>
        <div>{cat.title}</div>
      </Link>
    </li>
  ))}
</ul>
</div> */}