export interface IJourneyDetails {
    CoachNumber : string;
    CoachType : string;
    DepartureDistance : string;
    DepartureStation : string;
    DepartureTime : string;
    DestinationDistance : string;
    DestinationStation : string;
    DestinationTime : string;
    ID : number;
    journeyDate : string;
    PassengerAge : string;
    PassengerCategory : string;
    PassengerGender : string;
    PassengerName : string;
    PassengerPhoneNumber : string;
    Price : string;
    SeatNumber : number;
    TrainCode : string;
    TrainName : string;
    isBooked: boolean
}

export default interface IJourneyCards {
    MostTravelTrain : string;
    monthlyCount : number;
    totalUpcomingJourney : number;
    yearlyCount : number;
    upcomingJourneyDetails : Array<IJourneyDetails>
}