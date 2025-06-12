import APIService from "../Service/APIServices/APIService";

const useJourneyHook = () => {
    const getCardData = async (userEmail : any) => {
        const response = await APIService.getData("/passengerDetails/getCardValues" , userEmail);
        return response.data;
    };
    const getDayByDayJourneyDetails = async (userEmail : any) => {
        const response = await APIService.getData("/passengerDetails/dayByDayDetails" , userEmail);
        return response.data;
    };
    const getTrainJourney = async (trainCode : string , DepartureStation : string , DestinationStation : string) => {
        const response = await APIService.getData("/passengerDetails/trainJourney" , {trainCode , DepartureStation , DestinationStation});
        return response.data;
    };
    const getTicket = async (trainCode : string , JourneyDate : Date , userEmail : string) => {
        const response = await APIService.getData("/passengerDetails/ticket" , { trainCode , JourneyDate , userEmail});
        return response.data;
    }
    const searchHandeler = (data : Array<Record<string,string>> , searchValue : string) => {
        if(searchValue.trim().length === 0) return data;
        return data?.filter(item => item.TrainName.includes(searchValue))
    }

    return {getCardData , getDayByDayJourneyDetails , getTrainJourney , getTicket , searchHandeler};
}

export default useJourneyHook;