import React from 'react'
import Card, { TotalCustomersCard } from '../../../ui/card/card';
import MonthlyIncomeChart from '../../../ui/chart/chart';
import { totalCardsData, bookingData, topTenCustomers, chartData, cardData } from '../../../components/data';

const Home = () => {
  const colors = ["#009EFB", "#FFBC34", "#55CE63", "#7460EE"];
  return (
    <div className='p-4 my-2 mx-2'>
      <div className='flex mb-3 items-center gap-2 justify-between'>
        {cardData.map((item, index) => (
          <Card key={index} {...item} bgColor={colors[index]} />
        ))}
      </div>

      <div className='my-5 bg-[#ffffff] p-6 border-2 rounded-lg'>
        <h2 className="text-xl font-bold mb-4">Yearly Income</h2>
        <div className="p-6">
          <MonthlyIncomeChart data={chartData} />
        </div>
      </div>

      {/* Booking of the month */}
      <div className='flex flex-wrap '>
        <div className='w-2/6 bg-[#9ef05b] rounded-md p-3 shadow-[1px_2px_6px_0px_#e2e8f0]'>
          <h2 className="text-xl font-bold mb-4">Booking of the Month</h2>
          {bookingData.length === 0 ? (
            <p className="text-gray-600">No bookings for this month.</p>
          ) : (
            <ul className="">
              {bookingData.map((booking) => (
                <li key={booking.id} className="mb-2 flex items-center">
                  <span className="font-semibold">{booking.customerName}</span>
                  <span className="ml-2 text-gray-600">${booking.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Total customers,ground,booking, income */}
        <div className='flex flex-wrap justify-evenly gap-6 w-4/6'>
          {totalCardsData.map((item, index) => {
            return <TotalCustomersCard key={index} {...item} bgColor={colors[index]} />
          })}
        </div>
      </div>

      {/* top 10 customers table */}
      <div className="bg-[#59d5e0] p-4 rounded-lg border-2 shadow-[1px_2px_6px_0px_#e2e8f0] my-5 ">
        <h2 className="text-xl font-bold mb-4">Top 10 Customers Of The Year</h2>
        <div className='w-full h-full flex justify-center items-center'>
          <table className="min-w-full divide-y divide-gray-500">
            <thead >
              <tr>
                <th className="text-left py-3 px-4 text-center">Rank</th>
                <th className="text-left py-3 px-4 text-center">Name</th>
                <th className="text-left py-3 px-4 text-center">Booking Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {topTenCustomers.map((customer) => (
                <tr key={customer.rank} >
                  <td className="py-4 px-4 text-center">{customer.rank}.</td>
                  <td className="py-4 px-4 text-center">{customer.name}</td>
                  <td className="py-4 px-4 text-center">₹{customer.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home