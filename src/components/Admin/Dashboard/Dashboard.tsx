"use client"
import React from 'react'
import MonthlyIncomeChart from '../../../ui/chart/chart';
import { IoIosFootball } from "react-icons/io";
import { chartData, topTenOwners } from '../../data';
const Dashboard = () => {
  return (
    <div className='p-3'>
      <div className='flex rounded-md p-3 gap-4 justify-center'>
        <div className='flex flex-col items-center justify-center bg-[#7460EE] text-white rounded-md w-48 h-28 p-4'>
          <h2 className='font-semibold text-3xl mb-1'>3</h2>
          <h4 className='text-sm'>Owners</h4>
        </div>
        <div className='flex flex-col items-center justify-center bg-[#55CE63] text-white rounded-md w-48 h-28 p-4'>
          <h2 className='font-semibold text-3xl mb-1'>3</h2>
          <h4 className='text-sm'>Owners</h4>
        </div>
        <div className='flex flex-col items-center justify-center bg-[#FFBC34] text-white rounded-md w-48 h-28 p-4'>
          <h2 className='font-semibold text-3xl mb-1'>3</h2>
          <h4 className='text-sm'>Owners</h4>
        </div>
        <div className='flex flex-col items-center justify-center bg-[#009EFB] text-white rounded-md w-48 h-28 p-4'>
          <h2 className='font-semibold text-3xl mb-1'>3</h2>
          <h4 className='text-sm'>Owners</h4>
        </div>

      </div>
      <div className='my-2 bg-[#ffffff] rounded-lg border-2 p-8 '>
        <h2 className="text-xl font-bold">Yearly Income</h2>
        <div className="p-4 ">
          <MonthlyIncomeChart data={chartData} />
        </div>
      </div>
      <div className='flex justify-evenly mb-10 mt-5'>
        <div className="bg-[#59d5e0] p-4 rounded-lg border-2 rounded-md shadow-[1px_2px_6px_0px_#e2e8f0]">
          <h2 className="text-2xl font-bold mb-4">Earning Of Owners (Check top 10 Owners)</h2>
          <table className="min-w-full divide-y divide-gray-500">
            <thead>
              <tr>
                <th className="border-b p-2 text-center">Rank</th>
                <th className="border-b p-2 text-center">Owner</th>
                <th className="border-b p-2 text-center">Earning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {topTenOwners.map((owner, index) => (
                <tr key={owner.id}>
                  <td className="border-b p-2 text-center">{index + 1}</td>
                  <td className="border-b p-2 text-center">{owner.name}</td>
                  <td className="border-b p-2 text-center">₹{owner.earning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='bg-[#55CE63]  rounded-md p-4 ml-1 shadow-[1px_2px_6px_0px_#e2e8f0]'>
          <h2 className="text-2xl font-bold mb-4">Feeds</h2>
          <h3 className='flex rounded-md items-center p-2 bg-gray-300 mb-3'>
            <span><IoIosFootball size={20} className='mr-3' /></span>
            You have 1 pending Sports for Activation.</h3>
          <h3 className='flex rounded-md items-center p-2 bg-gray-300 mb-3'>
            <span><IoIosFootball size={20} className='mr-3' /></span>
            You have 1 pending Sports for Activation.</h3>
          <h3 className='flex rounded-md items-center p-2 bg-gray-300 mb-3'>
            <span><IoIosFootball size={20} className='mr-3' /></span>
            You have 1 pending Sports for Activation.</h3>
        </div>
      </div>

    </div>

  )
}

export default Dashboard