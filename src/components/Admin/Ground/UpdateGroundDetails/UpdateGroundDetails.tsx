"use client"
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { MdCancel } from "react-icons/md";
import Map from "../Map/Map";
import ApiServices from "@/services/ApiServices";
import Image from "next/image";

interface childComponentsProps {
  updateGroundDetail: boolean;
  setUpdateGroundDetail: (val: boolean) => void;
  addNewGround: boolean;
}

interface IGround {
  ground_name: string;
  ground_description?: string;
  ground_address: string;
  pincode?: number;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  contact_no?: string;
  ground_opening: string;
  ground_closing: string;
  price_per_hour?: number;
  price_per_day?: number;
  weekend_per_day?: number;
  weekend_per_hour?: number;
  weekend_night_price?: number;
  night_start_time?: string;
  size_of_ground?: string;
  ground_service: {
    service_id: string;
    service_name: string;
    service_price_hour?: number;
    service_price_day?: number;
  }[];
  ground_sports: {
    sports_id: string;
  }[],
  user_id: string; // Assuming user_id is a string on the frontend
  status: 'available' | 'unavailable' | 'booked';
  images: any[];
  [key: string]: any;
}

interface ISport {
  _id: string;
  sports_name: string;
  added_uid: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IService {
  _id: string;
  service_name: string;
  added_uid: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


const UpdateGroundDetails: React.FC<childComponentsProps> = ({
  updateGroundDetail,
  setUpdateGroundDetail,
  addNewGround,
}) => {

  // for sports
  const [sports, setSports] = useState<ISport[]>([]);
  useEffect(() => {
    const getSports = async () => {
      const sport = await ApiServices.getAllSports();
      if (sport) {
        setSports(sport);
      } else {
        setSports([]);
      }
    }
    getSports();
  }, []);

  // for services
  const [services, setServices] = useState<IService[]>([]);
  useEffect(() => {
    const getServices = async () => {
      const service = await ApiServices.getAllServices();
      if (service) {
        setServices(service);
      } else {
        setServices([]);
      }
    }
    getServices();
  }, []);

  // for upload data
  const [groundData, setGroundData] = useState<IGround>({
    ground_name: 'prism',
    ground_description: 'is the best place to play football',
    ground_address: '49, nanpura kathorvala ma',
    pincode: 395005,
    city: 'Surat',
    state: 'Gujarat',
    latitude: 21.21118431915209,
    longitude: 72.83096028300562,
    contact_no: '9313389251',
    ground_opening: '10:00',
    ground_closing: '20:00',
    price_per_hour: 500,
    price_per_day: 500,
    weekend_per_day: 500,
    weekend_per_hour: 500,
    weekend_night_price: 500,
    night_start_time: '20:00',
    size_of_ground: '40 by 50 ft',
    ground_service: [{ "service_id": "65eec090f8733dc35f7a1d2a", "service_name": "bat and ball", "service_price_hour": 100, "service_price_day": 200 }, { "service_id": "65eec181f8733dc35f7a1d34", "service_name": "vollyball ball", "service_price_hour": 210, "service_price_day": 210 }],
    ground_sports: [{
      "sports_id": "65eebf30808eff43b42c741c"
    }, {
      "sports_id": "65eebf06808eff43b42c7418"
    }],
    user_id: '65eeb8d3f8ee5dc49064ce74',
    status: 'available',
    images: []
  });

  // for map
  const [latLong, setLatLong] = useState({ lat: 21.21118431915209, long: 72.83096028300562 });
  // useEffect(() => {
  //   setGroundData({ ...groundData, latitude: latLong.lat, longitude: latLong.long });
  // }, [latLong])


  const handleSportCheckboxChange = (sportsId: string) => {
    const isSelected = groundData.ground_sports.some((item) => item.sports_id === sportsId);

    if (isSelected) {
      setGroundData({
        ...groundData,
        ground_sports: groundData.ground_sports.filter((selectedSport) => selectedSport.sports_id !== sportsId)
      });
    } else {
      const sport = {
        sports_id: sportsId
      };
      setGroundData({
        ...groundData,
        ground_sports: [...groundData.ground_sports, sport],
      });
    }
  };
  const handleServiceCheckboxChange = (serviceId: string, serviceName: string) => {
    // Check if the service is already selected
    const isSelected = groundData.ground_service.some((item) => item.service_id === serviceId);
    // Update the selected services array based on the checkbox change
    if (isSelected) {
      setGroundData({
        ...groundData,
        ground_service: groundData.ground_service.filter((selectedService) => selectedService.service_id !== serviceId),
      });
    } else {
      setGroundData({
        ...groundData,
        ground_service: [
          ...groundData.ground_service,
          {
            service_id: serviceId,
            service_name: serviceName,
            'service_price_hour': undefined,
            'service_price_day': undefined,
          },
        ],
      });
    }
  };

  // for image
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const imagesArray: string[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        const file = files[i];

        fileReader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result && typeof e.target.result === 'string') {
            imagesArray.push(e.target.result);
            if (imagesArray.length === files.length) {
              setSelectedImages(imagesArray);
            }
          }
        };

        fileReader.readAsDataURL(file);
      }
    }
  };

  useEffect(() => {
    setGroundData({ ...groundData, images: selectedImages });
  }, [selectedImages])

  const handleSubmit = async () => {
    try {
      const result: any = await ApiServices.createGround(groundData);
      if (!result) {
        window.alert("Failed to create ground");
      } else {
        window.alert(JSON.stringify(result, null, 2));
      }
    } catch (error) {
      console.log("Ground does not created!");
      window.alert("Something went wrong! Please try again later.");
    }
  };

  return (
    <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] mx-auto bg-white shadow-[0px_10px_50px_5px_#00a00] rounded-lg h-[80%] w-[80%] overflow-y-scroll p-3 z-50">
      <div className="px-6 py-4 relative h-full w-full">
        <div className="flex w-full justify-between mb-2">
          <h5 className="font-semibold text-lg mb-2 text-blue-500">
            {addNewGround ? "Add New Ground" : "Update Ground Detail"}
          </h5>
          <span className="cencel">
            <MdCancel
              size={27}
              className="text-blue-800 hover:text-red-600"
              onClick={() => {
                setUpdateGroundDetail(false);
              }}
            />
          </span>
        </div>
        <hr />
        <form className="my-3">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Ground
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="GroundName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ground Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={groundData.ground_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setGroundData({ ...groundData, 'ground_name': e.target.value })
                        }}
                        name="groundName"
                        id="groundName"
                        autoComplete="groundName"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 p-2"
                        placeholder="Ground Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="groundDescription"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ground Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={groundData.ground_description}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'ground_description': e.target.value })
                      }}
                      id="groundDescription"
                      name="groundDescription"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                      placeholder="Ground Description"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="Service" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                    Select Sports
                  </label>
                  <div className="flex items-center">
                    {sports.length >= 0 && sports.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`checkSport-${index}`}
                          name={`checkSport-${index}`}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ml-3"
                          onChange={() => handleSportCheckboxChange(item._id)}
                          checked={groundData.ground_sports.some(sport => sport.sports_id === item._id)}
                        />
                        <label htmlFor={`checkSport-${index}`} className="ml-1 text-gray-700 text-sm" key={index}>
                          {item.sports_name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="Service" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                    Select Service
                  </label>
                  <div className="flex items-center">
                    {services.length >= 0 && services.map((service, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          name={`checkbox-${index}`}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ml-3"
                          onChange={() => handleServiceCheckboxChange(service._id, service.service_name)}
                          checked={groundData.ground_service.some(item => item.service_id === service._id)}
                        />
                        <label htmlFor={`checkbox-${index}`} className="ml-1 text-gray-700 text-sm" key={index}>
                          {service.service_name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {groundData.ground_service.length > 0 && <><div className="col-span-full flex justify-around w-full">
                  <p>Service Cost Per Hour</p>
                  <p>Service Cost Per Day</p>
                </div>
                  {groundData.ground_service.map((item, index) => {
                    return <><div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {item.service_name}
                        {/* {item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ').replace('_', ' ')} */}
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          value={groundData.ground_service[index]?.service_price_hour}
                          onChange={(e) => {
                            const updatedGroundService = [...groundData.ground_service];
                            updatedGroundService[index] = {
                              ...updatedGroundService[index],
                              service_price_hour: parseInt(e.target.value) || undefined,
                            };
                            setGroundData({ ...groundData, ground_service: updatedGroundService });
                          }}
                          type="number"
                          inputMode="numeric"
                          name="batballpricehour"
                          id="batballpricehour"
                          className="block w-full rounded-md border-0 py-1.5 p-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder={"0.0"}
                          min={0}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 mr-3">
                          .00
                        </div>
                      </div>
                    </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="batballpriceday"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {item.service_name}
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">₹</span>
                          </div>
                          <input
                            value={groundData.ground_service[index]?.service_price_day}
                            onChange={(e) => {
                              const updatedGroundService = [...groundData.ground_service];
                              updatedGroundService[index] = {
                                ...updatedGroundService[index],
                                service_price_day: parseInt(e.target.value) || undefined,
                              };
                              setGroundData({ ...groundData, ground_service: updatedGroundService });
                            }}
                            type="number"
                            inputMode="numeric"
                            name="batballpriceday"
                            id="batballpriceday"
                            className="appearance-none block w-full rounded-md border-0 py-1.5 p-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={"0.0"}
                            min={0}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 mr-3">
                            .00
                          </div>
                        </div>
                      </div></>
                  })}

                </>}

                <hr className="sm:col-span-full" />

                <div className="sm:col-span-3">
                  <label
                    htmlFor="groundSize"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Size of Ground
                  </label>
                  <div className="mt-2">
                    <input
                      value={groundData.size_of_ground}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'size_of_ground': e.target.value })
                      }}
                      type="text"
                      name="groundSize"
                      id="groundSize"
                      autoComplete="fagroundSize"
                      placeholder="50 by 40 ft"
                      className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ground Status
                  </label>
                  <div className="mt-2 ">
                    <select
                      value={groundData.status}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'status': e.target.value as "available" | "booked" | "unavailable" });
                      }}
                      id="status"
                      name="status"
                      autoComplete="Ground-Status"
                      className="block w-full h-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Available</option>
                      <option>Unavailable</option>
                      <option>Booked</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="starting-time"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ground Timing
                  </label>
                  <div className="mt-2 flex items-center justify-around">
                    <input
                      value={groundData.ground_opening}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'ground_opening': e.target.value });
                      }}
                      id="starting-time"
                      name="starting-time"
                      type="time"
                      defaultValue={"07:00"}
                      autoComplete="starting-time"
                      className="block w-[30%] p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p>To</p>
                    <input
                      value={groundData.ground_closing}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'ground_closing': e.target.value });
                      }}
                      id="ending-time"
                      name="ending-time"
                      type="time"
                      defaultValue={"10:00"}
                      autoComplete="ending-time"
                      className="block w-[30%] p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="contectNo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contect Number
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">+91</span>
                    </div>
                    <input
                      id="contectNo"
                      name="contectNo"
                      type="number"
                      inputMode="numeric"
                      autoComplete="phone"
                      min={0}
                      onWheel={(e) => e.preventDefault()}
                      value={groundData.contact_no}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'contact_no': e.target.value });
                      }}
                      className="block w-full rounded-md border-0 py-1.5 p-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <hr className="col-span-full" />

                <div className="col-span-full">
                  <h4 className="text-lg font-semibold">Pricing</h4>
                </div>

                <div className="col-span-full">
                  <h4 className="text-lg">Weekday Price</h4>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="pricePerHour"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price Per Hour
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      value={groundData.price_per_hour}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'price_per_hour': parseInt(e.target.value) })
                      }}
                      type="number"
                      inputMode="numeric"
                      name="pricePerHour"
                      id="pricePerHour"
                      className="block w-full rounded-md border-0 py-1.5 p-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder={"0.0"}
                      min={0}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 mr-3">
                      .00
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <div>
                    <label
                      htmlFor="pricePerDay"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price Per Day
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        value={groundData.price_per_day}
                        onChange={(e) => {
                          setGroundData({ ...groundData, 'price_per_day': parseInt(e.target.value) })
                        }}
                        type="number"
                        inputMode="numeric"
                        name="pricePerDay"
                        id="pricePerDay"
                        className="block w-full rounded-md border-0 py-1.5 p-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder={"0.0"}
                        min={0}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 mr-3">
                        .00
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-span-full">
                  <h4 className="text-lg">Weekend Price</h4>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="pricePerHour"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price Per Hour
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      value={groundData.weekend_per_hour}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'weekend_per_hour': parseInt(e.target.value) })
                      }}
                      type="number"
                      inputMode="numeric"
                      name="pricePerHourWeekend"
                      id="pricePerHourWeekend"
                      className="block w-full rounded-md border-0 py-1.5 p-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder={"0.0"}
                      min={0}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 mr-3">
                      .00
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="pricePerDay"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price Per Day
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      value={groundData.weekend_per_day}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'weekend_per_hour': parseInt(e.target.value) })
                      }}
                      type="number"
                      inputMode="numeric"
                      name="pricePerDayWeekend"
                      id="pricePerDayWeekend"
                      className="block w-full rounded-md border-0 py-1.5 p-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder={"0.0"}
                      min={0}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 mr-3">
                      .00
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="pricePerHour"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Night Price Per Hour
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      value={groundData.weekend_night_price}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'weekend_night_price': parseInt(e.target.value) })
                      }}
                      type="number"
                      inputMode="numeric"
                      name="pricePerHourWeekendNight"
                      id="pricePerHourWeekendNight"
                      className="block w-full rounded-md border-0 py-1.5 p-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder={"0.0"}
                      min={0}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center text-gray-500 mr-3">
                      .00
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="starting-night-time"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Night Starting Time
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      value={groundData.night_start_time}
                      onChange={(e) => {
                        setGroundData({ ...groundData, 'night_start_time': e.target.value });
                      }}
                      id="night-starting-time"
                      name="night-starting-time"
                      type="time"
                      defaultValue={"07:00"}
                      autoComplete="night-starting-time"
                      className="block w-[30%] p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <hr className="col-span-full" />

                <div className="col-span-full">
                  <h4 className="text-lg font-semibold">Address</h4>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street"
                      id="street"
                      value={groundData.ground_address}
                      onChange={(e) => {
                        setGroundData({ ...groundData, "ground_address": e.target.value })
                      }}
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      value="India"
                      autoComplete="address-level"
                      defaultValue={"India"}
                      disabled
                      className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2 ">
                    <select
                      id="city"
                      name="city"
                      value={groundData.city}
                      onChange={(e) => {
                        setGroundData({ ...groundData, "city": e.target.value })
                      }}
                      autoComplete="city"
                      className="block w-full h-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Surat</option>
                      <option>Vadodra</option>
                      <option>Bharuch</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State
                  </label>
                  <div className="mt-2 ">
                    <select
                      id="state"
                      name="state"
                      value={groundData.state}
                      onChange={(e) => {
                        setGroundData({ ...groundData, "state": e.target.value })
                      }}
                      autoComplete="state"
                      className="block w-full h-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Gujarat</option>
                      <option>Maharastra</option>
                      <option>Rajstan</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Post Code
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="postal-code"
                      id="postal-code"
                      pattern="[0-9]{6}"
                      autoComplete="postal-code"
                      value={groundData.pincode}
                      placeholder="000000"
                      onChange={(e) => {
                        setGroundData({ ...groundData, "pincode": parseInt(e.target.value) })
                      }}
                      className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-3 ">
                  <label
                    htmlFor="user"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select User
                  </label>
                  <div className="mt-2 ">
                    <select
                      id="country"
                      name="country"
                      autoComplete="Ground-Status"
                      className="block w-full h-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>fakeemail@gmail.com</option>
                      <option>fakeemail@gmail.com</option>
                      <option>fakeemail@gmail.com</option>
                    </select>
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="latitude"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    latitude
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      value={latLong.lat}
                      onChange={(e) => {
                        setLatLong({ ...latLong, lat: parseFloat(e.target.value) });
                      }}
                      name="latitude"
                      id="latitude"
                      autoComplete="latitude"
                      className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="longitude"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    longitude
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      value={latLong.long}
                      onChange={(e) => {
                        setLatLong({ ...latLong, long: parseFloat(e.target.value) });
                      }}
                      name="longitude"
                      id="longitude"
                      autoComplete="longitude"
                      className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <div className="mt-2">
                    <Map setLatLong={setLatLong} initialLat={latLong.lat} initialLong={latLong.long} />
                  </div>
                </div>
                <hr className="col-span-full" />
                <div className="col-span-full">
                  <h4 className="text-lg font-semibold">Ground Images</h4>
                </div>
                <div className="col-span-full" draggable>
                  <input type="file" name="photos" accept="image/*" onChange={handleFileChange} multiple className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                  <div className="flex">
                    {selectedImages.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Selected image ${index + 1}`}
                        width={100} height={100}
                        className="mr-2 my-2 rounded object-cover" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 pb-5">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 hover:bg-indigo-200 rounded-md px-2 py-1"
              onClick={() => {

                setUpdateGroundDetail(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
        {JSON.stringify(groundData, null, 2)}
      </div>
    </div>
  );
};

export default UpdateGroundDetails;
