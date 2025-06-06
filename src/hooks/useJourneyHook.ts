import APIService from "../Service/APIServices/APIService";

const useJourneyHook = () => {
    const getCardData = async () => {
        const response = await APIService.getData("/passengerDetails/getCardValues");
        return response.data;
    };
    const getDayByDayJourneyDetails = async () => {
        const response = await APIService.getData("/passengerDetails/dayByDayDetails");
        return response.data;
    };
    const getTrainJourney = async (trainCode : string , DepartureStation : string , DestinationStation : string) => {
        const response = await APIService.getData("/passengerDetails/trainJourney" , {trainCode , DepartureStation , DestinationStation});
        return response.data;
    };
    const getTicket = async (trainCode : string , JourneyDate : Date) => {
        const response = await APIService.getData("/passengerDetails/ticket" , { trainCode , JourneyDate});
        return response.data;
    }

    return {getCardData , getDayByDayJourneyDetails , getTrainJourney , getTicket};
}

export default useJourneyHook;