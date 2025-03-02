import axios from "axios";

export default class APIService {
  static baseURL: string = "http://localhost:8000";
  static getData = async (url: string, data?: Record<string, any>) => {
    try {
      const res = await axios.post(this.baseURL + url, data);
      return { success: res.data.success, data: res.data.data };
    } catch (error) {
      console.log("Error  ", error);
      return { success: false };
    }
  };
}
