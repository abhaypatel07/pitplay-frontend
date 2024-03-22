import axios from "axios";
// const BACKEND_URI = "https://3b56-103-206-138-183.ngrok-free.app";
const BACKEND_URI = "http://pitplay-owner-self.vercel.app";

class ApiServices {
  //User Routes
  static createUser = async (data: any) => {
    try {
      const result = await axios.post(`${BACKEND_URI}/api/create_user`, data);
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  //Grounds
  static getAllGrounds = async (page: number) => {
    try {
      const result = await axios.get(
        `${BACKEND_URI}/api/app/ground/groundList?page=${page}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  static createGround = async (data: any) => {
    try {
      const result = await axios.post(
        `${BACKEND_URI}/api/app/ground/addground`,
        data
      );
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  static showGround = async (id: any) => {
    try {
      const result = await axios.get(
        `${BACKEND_URI}/api/app/ground/showground`,
        id
      );
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  static updateGround = async (data: any) => {
    try {
      const result = await axios.put(
        `${BACKEND_URI}/api/app/ground/updateground`,
        data
      );
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  static deleteGround = async (id: any) => {
    try {
      const result = await axios.delete(
        `${BACKEND_URI}/api/app/ground/deleteground`,
        id
      );
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  //Bookings
  static getAllBookings = async () => {
    try {
      const result = await axios.get(
        `${BACKEND_URI}/api/app/bookings/allbookings`
      );
      // console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  static createBooking = async (data: any) => {
    try {
      const result = await axios.post(
        `${BACKEND_URI}/api/app/bookings/createbooking`,
        data
      );
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  static updateBooking = async (data: any) => {
    try {
      const result = await axios.put(
        `${BACKEND_URI}/api/app/bookings/updatebookings`,
        data
      );
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  //Servicess
  static getAllServices = async () => {
    try {
      const result = await axios.get(
        `${BACKEND_URI}/api/app/ground/serviceList`
      );
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  static createService = async (data: any) => {
    try {
      const result = await axios.post(
        `${BACKEND_URI}/api/app/ground/addservices`,
        data
      );
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  static deleteServices = async (id: any) => {
    try {
      const result = await axios.delete(
        `${BACKEND_URI}/api/app/ground/deleteservice`,
        id
      );
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  //Sports
  static getAllSports = async () => {
    try {
      const result = await axios.get(
        `${BACKEND_URI}/api/app/ground/sportsList`
      );
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  static createSports = async (data: any) => {
    try {
      const result = await axios.post(
        `${BACKEND_URI}/api/app/ground/addsports`,
        data
      );
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  static deleteSports = async (id: any) => {
    try {
      const result = await axios.delete(
        `${BACKEND_URI}/api/app/ground/deletesports`,
        id
      );
      console.log(result.data);
      return result.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  //image
  static uploadImage = async (formData: any) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/api/photos/upload",
        formData
      );
      console.log(result);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default ApiServices;
