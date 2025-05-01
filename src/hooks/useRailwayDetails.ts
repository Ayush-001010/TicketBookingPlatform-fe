import APIService from "../Service/APIServices/APIService";

const useRailwayDetails = () => {

    const getStates = async () => {
        try {
            const response = await APIService.getData("/stations/getState");
            return response?.data;
        } catch (error) {
            console.log("Error ", error);
            return { success: false };
        }
    }
    const getStations = async (stateName :  string) => {
        try{
            stateName = stateName.replace('_', ' ');
            console.log("State Name ", stateName);
            const response = await APIService.getData('/stations/getStation', { StateName :  stateName });
            return response?.data;
        } catch(error){
            console.log("Error ", error);
            return { success: false };
        }
    } 
    const addStation = async (data : any) => {
        try {
            data.IsActive = true;
            const response = await APIService.getData('/stations/addStation', {data});
            return response?.data;  
        } catch(error){
            console.log("Error ", error);
            return { success: false };
        }
    }
    const editStation = async (data : any) => {
        try {
            const response = await APIService.getData('/stations/editStation', {data});
            return response?.data;
        } catch(error){
            console.log("Error ", error);
            return { success: false };
        }
    }
    return { getStates , getStations , addStation , editStation };
};

export default useRailwayDetails;