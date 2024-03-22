"use client";
import React, { useEffect, useState } from "react";
import Search from "../../../ui/search/search";
import { MdAddCircle, MdDelete, MdSearch } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
import Pagination from "../../../ui/pagination/pagination";
import GroundDetails from "./GroundDetails/GroundDetail";
import UpdateGroundDetails from "./UpdateGroundDetails/UpdateGroundDetails";
import ApiServices from "../../../services/ApiServices";
import Image from "next/image";
import Loading from "@/app/admin/loading";

interface IGround {
  _id: string;
  ground_name: string;
  ground_description: string;
  ground_address: string;
  pincode: number;
  city: string;
  state: string;
  ground_cover_img: string;
  latitude: number;
  longitude: number;
  contact_no: string;
  ground_opening: string;
  ground_closing: string;
  price_per_hour: number;
  price_per_day: number;
  weekend_per_day: number;
  weekend_per_hour: number;
  weekend_night_price: number;
  night_start_time: string;
  size_of_ground: string;
  ground_service: string[];
  ground_sports: string[];
  user_id: string;
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const Ground = () => {
  const [grounds, setGrounds] = useState<IGround[]>([]);
  const [groundDetail, setGroundDetail] = useState(false);
  const [groundDetailData, setGroundDetailData] = useState<IGround>(
    {} as IGround
  );
  const [UpdateGroundDetail, setUpdateGroundDetail] = useState(false);
  const [addNewGround, setAddNewGround] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getAllGrounds = async (page: number) => {
    try {
      setIsLoading(true);
      const fetchedGrounds = await ApiServices.getAllGrounds(page);
      if (fetchedGrounds.success) {
        setGrounds(fetchedGrounds?.data);
        setTotalPages(fetchedGrounds?.pagination.totalPages);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching grounds:", error);
    }
  };
  useEffect(() => {
    getAllGrounds(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleGroundDetail = (val: boolean) => {
    setGroundDetail(val);
  };
  const handleUpdateGroundDetail = (val: boolean) => {
    setUpdateGroundDetail(val);
    setAddNewGround(false);
  };

  return (
    <div className="p-3 rounded-lg">
      <div className="flex items-center justify-between p-4 rounded-md">
        <div className="flex items-center gap-2 p-2 bg-[#55CE63] text-white rounded-md placeholder-white w-auto">
          <MdSearch className="searchIcon" size={20} />
          <input
            type="text"
            placeholder="Search Grounds"
            className="bg-transparent border-none outline-none forPlaceholder"
          // value={searchQuery}
          // onChange={handleSearch}
          />
        </div>
        <div
          onClick={() => {
            setUpdateGroundDetail(true);
            setAddNewGround(true);
          }}
          className="bg-[#7460EE] text-white hover:bg-[#0000FF] flex items-center px-4 py-2 gap-2 rounded-md"
        >
          <MdAddCircle size={20} />
          <button>Add New</button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full divide-y border-2 rounded-lg">
        <thead className="text-xs text-[--textClr] uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Ground Images
            </th>
            <th scope="col" className="px-6 py-3">
              Ground Name
            </th>
            <th scope="col" className="px-6 py-3">
              Ground Address
            </th>
            <th scope="col" className="px-6 py-3">
              Contact No
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (<>
            <tr key={101} className="divide-y divide-gray-200 odd:bg-white even:bg-gray-100 animate-pulse">
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="rounded-md bg-slate-200 h-16 w-18"></div></td>{" "}
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
            </tr>
{/*             <tr key={102} className="divide-y divide-gray-200 odd:bg-white even:bg-gray-100 animate-pulse">
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="rounded-md bg-slate-200 h-16 w-18"></div></td>{" "}
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
            </tr>
            <tr key={103} className="divide-y divide-gray-200 odd:bg-white even:bg-gray-100 animate-pulse">
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="rounded-md bg-slate-200 h-16 w-18"></div></td>{" "}
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
              <td className="px-6 py-4 text-center"> <div className="h-2 bg-slate-200 rounded col-span-2"></div></td>
            </tr> */}
          </>
          ) : (
            grounds?.map((item, index) => (
              <tr
                key={item._id}
                className="divide-y divide-gray-200 odd:bg-white even:bg-gray-100"
              >
                <td className="px-6 py-4 text-center">
                  {index + (currentPage - 1) * 10 + 1}.
                </td>
                <td className="px-6 py-4 text-center overflow-hidden">
                  <div className="w-40 flex items-center justify-center rounded-md overflow-clip">
                    <Image
                      src={item.ground_cover_img}
                      alt={item.ground_name}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover hover:scale-125 transition-all"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-center">{item.ground_name}</td>
                <td className="px-6 py-4 text-center">{item.ground_address}</td>
                <td className="px-6 py-4 text-center">{item.contact_no}</td>
                <td className="px-6 py-4 text-center">{item.status}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <FaEye
                      onClick={() => {
                        setGroundDetail(true);
                        setGroundDetailData(item);
                      }}
                      size={23}
                      className="mx-1 text-blue-500 hover:text-blue-700 cursor-pointer"
                    />
                    <FaEdit
                      onClick={() => {
                        setUpdateGroundDetail(true);
                      }}
                      size={23}
                      className="mx-1 text-blue-500 hover:text-blue-700 cursor-pointer"
                    />
                    <MdDelete
                      size={23}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {groundDetail && (
        <>
          {" "}
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
            onClick={() => setGroundDetail(false)}
          ></div>
          <GroundDetails
            key={groundDetailData._id}
            groundDetails={groundDetailData}
            setGroundDetail={handleGroundDetail}
          />
        </>
      )}
      {UpdateGroundDetail && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
            onClick={() => {
              setUpdateGroundDetail(false);
            }}
          ></div>
          <UpdateGroundDetails
            updateGroundDetail={UpdateGroundDetail}
            setUpdateGroundDetail={handleUpdateGroundDetail}
            addNewGround={addNewGround}
          />
        </>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Ground;
