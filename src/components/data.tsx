interface chartDataType {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}
interface topTenOwnersType {
  id: number;
  name: string;
  earning: string;
}
interface totalCardsType {
  title: string;
  totalCounts: number;
}
interface topTenCustomers {
  rank: number;
  name: string;
  revenue: number;
}
interface cardDataType {
  title: string;
  count: number;
  income: number;
  percentage: number;
}
interface groundDataType {
  groundImages: string;
  groundName: string;
  groundAddress: string;
  contactNo: number;
  status: string;
}
export const cardData: cardDataType[] = [
  { title: 'Daily', count: 10, income: 1000, percentage: 15 },
  { title: 'Weekly', count: 50, income: 5000, percentage: 25 },
  { title: 'Monthly', count: 100, income: 10000, percentage: 30 },
  { title: 'Yearly', count: 500, income: 50000, percentage: 20 },
];
export const chartData: chartDataType = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Income',
      data: [2200, 3000, 3200, 2700, 1200, 2500, 1500, 1700, 1800, 2000, 2800, 3500],
      backgroundColor: 'rgb(94, 137, 230)',
    },
  ],

};

export const topTenOwners: topTenOwnersType[] = [
  {
    id: 1,
    name: 'John Doe',
    earning: '123456.78',
  },
  {
    id: 2,
    name: 'Jane Smith',
    earning: '987654.32',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    earning: '456789.10',
  },
  {
    id: 4,
    name: 'Alice Williams',
    earning: '789456.98',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    earning: '321654.76',
  },
  {
    id: 6,
    name: 'David Miller',
    earning: '654987.31',
  },
  {
    id: 7,
    name: 'Eve Wilson',
    earning: '987123.45',
  },
  {
    id: 8,
    name: 'Frank Taylor',
    earning: '234567.89',
  },
  {
    id: 9,
    name: 'Grace Adams',
    earning: '897654.32',
  },
  {
    id: 10,
    name: 'Harry Clark',
    earning: '567894.10',
  },
];

export const totalCardsData: totalCardsType[] = [
  { title: "Customers", totalCounts: 20 },
  { title: "Grounds", totalCounts: 20 },
  { title: "Booking", totalCounts: 20 },
  { title: "Income", totalCounts: 20 }
];

export const bookingData = [
  { id: 1, customerName: "John Doe", amount: 2000 }
];


export const topTenCustomers: topTenCustomers[] = [
  { rank: 1, name: 'John Doe', revenue: 1234567 },
  { rank: 2, name: 'Jane Smith', revenue: 987654 },
  { rank: 3, name: 'Jane Smith', revenue: 987654 },
  { rank: 4, name: 'Jane Smith', revenue: 987654 },
  { rank: 5, name: 'Jane Smith', revenue: 987654 },
  { rank: 6, name: 'Jane Smith', revenue: 987654 },
  // ... and so on
];

export const groundData: groundDataType[] = [
  {
    groundImages: "https://pitplay.in/control/upload/images/142/backgrounds-football-12.jpg",
    groundName: "woop",
    groundAddress: "amlipura,Surat,Gujarat,395005",
    contactNo: 9792929292,
    status: "Available"
  },
  {
    groundImages: "https://pitplay.in/control/upload/images/143/ground3.jpg",
    groundName: "Disotto",
    groundAddress: "vr mall,Surat,Gujarat,395007",
    contactNo: 9792929292,
    status: "Available"
  },
  {
    groundImages: "https://pitplay.in/control/upload/images/143/ground3.jpg",
    groundName: "Disotto",
    groundAddress: "vr mall,Surat,Gujarat,395007",
    contactNo: 9792929292,
    status: "Available"
  },
]

