import Link from "next/link";
import React from "react";

const loginBtn = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#5e9417] to-blue-200">
      <div
        className="grid place-items-center mx-2 my-20 sm:my-auto"
        x-data="{ showPass: true }"
      >
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
          px-6 py-10 sm:px-10 sm:py-6
          bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <div className="text-center">
            <h6 className="font-semibold text-[#063970] text-xl">
              Oops! You Need To Login First!
            </h6>
          </div>
          <Link href="api/auth/login">
            <button
              className="w-full py-3 mt-10 bg-[--primary] rounded-md
                  font-medium text-white uppercase
                  focus:outline-none hover:shadow-none"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default loginBtn;
