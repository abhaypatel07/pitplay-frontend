"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface MonthlyIncomeChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}
// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };

const MonthlyIncomeChart: React.FC<MonthlyIncomeChartProps> = ({ data }) => {
  return (<>
    <Bar data={data}/>
  </>);
};

export default MonthlyIncomeChart;