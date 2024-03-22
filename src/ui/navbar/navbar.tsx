"use client"
import { usePathname } from "next/navigation";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import pic from '../../../public/assets/picdefault.png'
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full md:w-90 p-4 mb-8 flex justify-between items-center bg-blue-100 rounded-md">
      <div className="uppercase font-bold text-lg">
        {pathname == "/admin" ? "Home" : pathname.split("/admin/")}
      </div>
      <div className="flex items-center">
        <Link href="/login" className="mx-5">
          <Image
            src={pic}
            width={100} height={100} alt="Logo"
            className="w-8 rounded-full hover:text-violet-600 "
          />
        </Link>

        <Link href={"api/auth/logout"}>
          <MdLogout className="hover:text-violet-600" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

