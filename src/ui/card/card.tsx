import React from 'react';
import { MdCalendarMonth } from "react-icons/md";
interface CardProps {
  title: string;
  count: number;
  income: number;
  percentage: number;
  bgColor: string;
}

const Card: React.FC<CardProps> = ({ title, count, income, percentage, bgColor }) => {
  return (
    <div className={`p-4 w-full rounded-md bg-[${bgColor}] shadow-[1px_2px_6px_0px_#cbd5e0]`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title} Bookings</h2>
        <span className="text-slate-900">({count})</span>
      </div>
      <div className="mb-4">
        <h2 className="">{title} Income</h2>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">₹{income}</span>
          <span className={`text-sm font-semibold px-2 py-1 rounded-md ${percentage >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{percentage}%</span>
        </div>
      </div>
    </div>
  );
}


interface TotalCustomersCardProps {
  totalCounts: number;
  title?: string;
  bgColor: string
}
const todayDate = new Date();
const formattedDate = todayDate.getDate().toString().padStart(2, '0') + '-' + (todayDate.getMonth() + 1).toString().padStart(2, '0') + '-' + todayDate.getFullYear();

export const TotalCustomersCard: React.FC<TotalCustomersCardProps> = ({ totalCounts, title, bgColor }) => {
  return (
    <div className={`w-2/5 p-3 rounded-md flex flex-col items-center  shadow-[1px_2px_6px_0px_#e2e8f0] bg-[${bgColor}]`}>
      <h3 className="text-lg font-bold">Total {title}</h3>
      <p className="text-[black] text-xs ">( Till {formattedDate} )</p>
      <span className="my-4 text-3xl font-bold text-[#03541f]">{totalCounts}</span>
    </div>
  );
};

export default Card;