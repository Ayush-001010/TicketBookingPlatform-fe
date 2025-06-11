import axios from "axios";

export default class APIService {
  // static baseURL: string = "http://localhost:8000";
  static baseURL:string = "https://ticketbookingplatform-be.onrender.com"
  static getData = async (url: string, data?: Record<string, any>) => {
    try {
      const res = await axios.post(this.baseURL + url, data);
      return { success: res.data.success, data: res.data.data , error : res.data.error };
    } catch (error) {
      console.log("Error  ", error);
      return { success: false };
    }
  };
}
