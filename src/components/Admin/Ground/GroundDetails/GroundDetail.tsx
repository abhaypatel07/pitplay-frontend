import Image from "next/image";
import React from "react";
import { MdCancel } from "react-icons/md";

interface childComponentsProps {
  groundDetails: IGround;
  setGroundDetail: (val: boolean) => void;
}

interface IGround {
  _id: string;
  ground_name: string;
  ground_description: string;
  ground_address: string;
  ground_cover_img: string;
  pincode: number;
  city: string;
  state: string;
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

const groundDetails: React.FC<childComponentsProps> = ({
  groundDetails,
  setGroundDetail,
}) => {
  return (
    <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] mx-auto bg-white shadow-[0px_10px_50px_5px_#00a00] z-50 overflow-hidden shadow-md rounded-lg">
      <div className="px-6 py-4 relative h-full w-full">
        <div className="flex w-full justify-between mb-2">
          <h5 className="font-semibold text-sm mb-2 text-blue-500">
            Ground Details
          </h5>
          <span className="cencel">
            <MdCancel
              size={27}
              className="text-blue-800 hover:text-red-600"
              onClick={() => {
                setGroundDetail(false);
              }}
            />
          </span>
        </div>
        <div className="flex flex-auto justify-center item-center gap-9 mb-5">
          <div className="column1">
            <h4 className="font-bold">{groundDetails.ground_name}</h4>
            <p className="mb-2">★★★★☆(4)</p>
            <Image
              src={groundDetails.ground_cover_img}
              width={150} height={150} alt="Logo"
              className="rounded"
            />
          </div>
          <div className="column2">
            <p className="font-semibold text-sm mb-2 text-red-500">
              Address & Timing
            </p>
            <div>
              <h5 className="font-semibold text-sm mb-2 text-blue-400">
                Address
              </h5>
              <p className="text-sm">
                {groundDetails.ground_address},
              </p>
              <p className="text-sm">
                {groundDetails.city},
              </p>
              <p className="text-sm">
                {groundDetails.state}
              </p>
            </div>
            <hr />
            <div>
              <h5 className="font-semibold text-sm mb-2 text-blue-400">
                Contect No
              </h5>
              <p className="text-sm">{groundDetails.contact_no}</p>
            </div>
            <hr />
            <div>
              <h5 className="font-semibold text-sm mb-2 text-blue-400">
                Ground timing:
              </h5>
              <p className="text-sm">
                Open : {groundDetails.ground_opening} <br />
                Close : {groundDetails.ground_closing} <br /> Night Start Time : {groundDetails.night_start_time}
              </p>
            </div>
          </div>
          <div className="column3 w-[200px]">
            <p className="font-semibold text-sm mb-2 text-red-500">
              Ground Details
            </p>
            <div>
              <h5 className="font-semibold text-sm mb-2 text-blue-400">
                Week Days
              </h5>
              <p className="text-sm">
                Hour Price : ₹ {groundDetails.price_per_hour} <br />
                Day Price : ₹ {groundDetails.price_per_day} <br />
              </p>
            </div>
            <hr />
            <div>
              <h5 className="font-semibold text-sm mb-2 text-blue-400">
                Weekend
              </h5>
              <p className="text-sm">
                Hour Price : ₹ {groundDetails.weekend_per_hour} <br />
                Day Price : ₹ {groundDetails.weekend_per_day} <br />
                Night Price : ₹ {groundDetails.weekend_night_price}
              </p>
            </div>
          </div>
          <div className="column4 w-[200px]">
            <p className="font-semibold text-sm mb-2 text-red-500">
              Sports and Services
            </p>
            <div>
              <h5 className="font-semibold text-sm mb-2 text-blue-400">Size</h5>
              <p className="text-sm">{groundDetails.size_of_ground}</p>
            </div>
            <hr />
            <div>
              <h5 className="font-semibold text-sm mb-2 text-blue-400">
                Sports
              </h5>
              {groundDetails?.ground_sports?.map((item) => {
                return <p className="text-sm">{item}</p>
              })}
            </div>
            <hr />
            <div>
              <h5 className="font-semibold text-sm mb-2 text-blue-400">
                Services
              </h5>
              {groundDetails?.ground_service?.map((item) => {
                return <p className="text-sm">{item}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default groundDetails;
