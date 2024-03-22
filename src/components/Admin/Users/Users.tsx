"use client"
import React, { useState } from 'react'
import Pagination from '../../../ui/pagination/pagination';
import Search from '../../../ui/search/search';
interface TableProps {
  data: {
    id: number;
    name: string;
    email: string;
    contact: string;
  }[];
}
const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic to fetch data for the new page if needed
  };
  const usersData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', contact: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', contact: '987-654-3210' },
    { id: 3, name: 'Jane Smith', email: 'jane.smith@example.com', contact: '987-654-3210' },
    { id: 4, name: 'Jane Smith', email: 'jane.smith@example.com', contact: '987-654-3210' },
    { id: 5, name: 'Jane Smith', email: 'jane.smith@example.com', contact: '987-654-3210' },
  ];
  return (
    <div className='p-3'>
      <div className='w-max mx-6'>
        <Search placeholder='Search User Details..' />
      </div>

      <table className="min-w-full divide-y my-10">
        <thead >
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email Id
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact No
            </th>
          </tr>
        </thead>
        <tbody >
          {usersData.map((item) => (
            <tr key={item.id} className="divide-y divide-gray-200 odd:bg-white even:bg-gray-100">
              <td className="px-6 py-4 ">{item.id}</td>
              <td className="px-6 py-4 ">{item.name}</td>
              <td className="px-6 py-4 ">{item.email}</td>
              <td className="px-6 py-4 ">{item.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

    </div>
  )
}

export default Users