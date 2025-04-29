import APIService from "../Service/APIServices/APIService";

const useRailwayStations = () => {

    const getStates = async () => {
        try {
            const response = await APIService.getData("/stations/getState");
            return response?.data;
        } catch (error) {
            console.log("Error ", error);
            return { success: false };
        }
    }

    return { getStates };
};

export default useRailwayStations;