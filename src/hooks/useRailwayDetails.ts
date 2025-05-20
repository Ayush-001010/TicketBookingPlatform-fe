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
    const getStations = async (stateName: string, filterVal?: Record<string, any>, searchStr?: string | null) => {
        try {
            stateName = stateName.replace('_', ' ');
            if (!searchStr) {
                console.log("State Name ", stateName);
                const response = await APIService.getData('/stations/getStation', { StateName: stateName, ...filterVal });
                return response?.data;
            } else {
                console.log("Search value" , searchStr);
                const response = await APIService.getData('/stations/search', { State: stateName, searchValue : searchStr });
                return response?.data;
            }
        } catch (error) {
            console.log("Error ", error);
            return { success: false };
        }
    }
    const addStation = async (data: any) => {
        try {
            const response = await APIService.getData('/stations/addStation', { data });
            return true;
        } catch (error) {
            console.log("Error ", error);
            return false;
        }
    }
    const editStation = async (data: any) => {
        try {
            const response = await APIService.getData('/stations/editStation', { data });
            return response?.data;
        } catch (error) {
            console.log("Error ", error);
            return { success: false };
        }
    }
    const getCardValues = async (stateName: string) => {
        try {
            stateName = stateName.replace('_', ' ');
            const response = await APIService.getData('/stations/getStationCardValues', { StateName: stateName });
            return response?.data;
        } catch (error) {
            console.log("Error ", error);
            return { success: false };
        }
    }
    const genratingSubPointsFunc = (item: any) => {
        const subPoints = [
            { Title: "State", Response: item.State },
            { Title: "City", Response: item.City },
            { Title: "Number Of Platforms", Response: item.NumberOfPlatforms },
            { Title: "Type Of Station", Response: item.TypeOfStation },
            { Title: "Is Active", Response: item.IsActive ? "Yes" : "No" },
            { Title: "Capacity", Response: item.Capacity },
            { Title: "Longitude", Response: item.Longitude },
            { Title: "Latitude", Response: item.Latitude },
        ];
        return subPoints;
    }
    return { getStates, getStations, addStation, editStation, getCardValues, genratingSubPointsFunc };
};

export default useRailwayDetails;