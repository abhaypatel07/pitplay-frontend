"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { MdSearch } from "react-icons/md";
import Pagination from '../../../ui/pagination/pagination';
interface DataTableProps {
  data: {
    id: number;
    groundName: string;
    customer: string;
    date: string;
    time: string;
    price: number;
    status: string;
  }[];
}
const Booking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('')
  const totalPages = 10;
  const data = [
    {
      id: 1,
      groundName: 'Ground A',
      customer: 'Alice',
      date: '2024-03-01',
      time: '10:00 AM',
      price: 50,
      status: 'Booked',
    },
    {
      id: 2,
      groundName: 'Ground B',
      customer: 'Bob',
      date: '2024-03-02',
      time: '11:00 AM',
      price: 60,
      status: 'Booked',
    },
    {
      id: 3,
      groundName: 'Ground C',
      customer: 'Charlie',
      date: '2024-03-03',
      time: '12:00 PM',
      price: 70,
      status: 'Booked',
    },
    {
      id: 4,
      groundName: 'Ground D',
      customer: 'David',
      date: '2024-03-04',
      time: '1:00 PM',
      price: 80,
      status: 'Booked',
    },
    {
      id: 5,
      groundName: 'Ground E',
      customer: 'Emma',
      date: '2024-03-05',
      time: '2:00 PM',
      price: 90,
      status: 'Booked',
    },
    {
      id: 6,
      groundName: 'Ground F',
      customer: 'Frank',
      date: '2024-03-06',
      time: '3:00 PM',
      price: 100,
      status: 'Booked',
    },
    {
      id: 7,
      groundName: 'Ground G',
      customer: 'Grace',
      date: '2024-03-07',
      time: '4:00 PM',
      price: 110,
      status: 'Booked',
    },
    {
      id: 8,
      groundName: 'Ground H',
      customer: 'Harry',
      date: '2024-03-08',
      time: '5:00 PM',
      price: 120,
      status: 'Booked',
    },
    {
      id: 9,
      groundName: 'Ground I',
      customer: 'Isabella',
      date: '2024-03-09',
      time: '6:00 PM',
      price: 130,
      status: 'Booked',
    },
    {
      id: 10,
      groundName: 'Ground J',
      customer: 'Jack',
      date: '2024-03-10',
      time: '7:00 PM',
      price: 140,
      status: 'Booked',
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  }
  const searchResult = data.filter((booking) => {
    const searchByGroundName = booking.groundName.toLowerCase().includes(searchQuery.toLowerCase())
    const searchByUserName = booking.customer.toLowerCase().includes(searchQuery.toLowerCase())
    return searchByGroundName || searchByUserName
  })
  console.log(searchQuery)
  return (
    <>
      <div className='flex items-center justify-between p-4 rounded-md'>
        <div className='w-max'>
          <div className="flex items-center gap-4 p-2 bg-[#55CE63] text-white rounded-md placeholder-white">
            <MdSearch className="searchIcon" size={20} />
            <input
              type="text"
              placeholder="Search Booking Details..."
              className="bg-transparent border-none outline-none forPlaceholder"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className='w-max flex'>
          <Link href={"/admin/bookings/futurebookings"} className='bg-[--primary] text-white hover:bg-[--primary2] flex items-center p-2 mr-2 rounded-md' >
            <button>Future Bookings(0)</button>
          </Link>
          <Link href={"/admin/bookings/allbookings"} className='border-2 border-[--primary] hover:bg-slate-50  flex items-center p-2 mr-2 rounded-md' >
            <button>All Bookings(64)</button>
          </Link>
          <Link href={"/admin/bookings/canceledbookings"} className='bg-red-600  hover:bg-red-700 text-white flex items-center p-2 rounded-md' >
            <button>Canceled Bookings(4)</button>
          </Link>
        </div>
      </div>
      <table className="w-full my-10 divide-y">
        <thead className="text-xs text-gray-700 uppercase ">
          <tr>
            <th className=" px-6 py-3">No</th>
            <th className=" px-6 py-3">Ground Name</th>
            <th className=" px-6 py-3">Customer</th>
            <th className=" px-6 py-3">Date</th>
            <th className=" px-6 py-3">Time</th>
            <th className=" px-6 py-3">Price</th>
            <th className=" px-6 py-3">Status</th>
            <th className=" px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {searchResult.map((item) => (
            <tr key={item.id} className='odd:bg-white even:bg-gray-100'>
              <td className=" px-6 py-3 text-center">{item.id}</td>
              <td className=" px-6 py-3 text-center">{item.groundName}</td>
              <td className=" px-6 py-3 text-center">{item.customer}</td>
              <td className=" px-6 py-3 text-center">{item.date}</td>
              <td className=" px-6 py-3 text-center">{item.time}</td>
              <td className=" px-6 py-3 text-center">{item.price}</td>
              <td className=" px-6 py-3 text-center">{item.status}</td>
              <td className=" px-6 py-3 text-center ">
                <button className="bg-[--primary] hover:bg-[--primary2] rounded-md text-white px-2 py-1 ">Edit</button>
                <button className="bg-red-600 hover:bg-red-700 rounded-md text-white px-2 py-1 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  )
}

export default Booking