import { useCallback, useEffect, useState } from "react";
import {
  IBookingOptions,
  ISideFilter,
  ITrainTicketBookingInterface,
} from "../Service/Interface/TrainBookingInterface";
import TrainBookingConfig from "../Service/Config/TrainBookingConfig";
import { IOptions } from "../Service/Interface/CommonInterface";
import APIService from "../Service/APIServices/APIService";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import { setTrainDetailsData } from "../Redux/Slices/TrainDetails";
import TicketBookingConfig from "../Service/Config/TicketBookingConfig";

const useTrainBooking = () => {
  const updateValue = useAppDispatch();
  const trainAllData = useAppSelector((state) => state.TrainDetailsSlice.allData);
  const [bookingOption, setBookingOption] = useState<
    Record<string, Array<IOptions>>
  >({});

  const genrateNumberOption = (endValue: number): Array<IOptions> => {
    const arr: Array<IOptions> = [];
    for (let index = 0; index <= endValue; index++) {
      const str: string = `${index < 10 ? `0${index}` : index.toString()}`;
      arr.push({ label: str, value: str });
    }
    return arr;
  };
  const genrateBookingOption = useCallback(async () => {
    const optArray: Array<IBookingOptions> =
      TrainBookingConfig.bookingOptionArray;
    let opt: Record<string, Array<IOptions>> = {};
    for (const { where, backendUrl, name, logic } of optArray) {
      const arr: Array<IOptions> = [];
      switch (where) {
        case "backend": {
          const res = await APIService.getData(backendUrl || "");
          if (name === "departureStation" || name === "destinationStation") {
            for (const item of res.data.placesData) {
              arr.push({ value: item.PlaceName, label: item.PlaceName });
            }
          }
          opt = { ...opt, [name]: arr };
          break;
        }
        case "logic": {
          switch (logic) {
            case "timeOnhour": {
              const arr = genrateNumberOption(24);
              opt = { ...opt, [name]: arr };
              break;
            }
            case "timeOnMinutes": {
              const arr = genrateNumberOption(60);
              opt = { ...opt, [name]: arr };
              break;
            }
            case "1to5": {
              const arr = genrateNumberOption(5);
              opt = { ...opt, [name]: arr };
              break;
            }
          }
          break;
        }
      }
    }
    return opt;
  }, []);
  const applyFilter = (filtersValue: Record<string, boolean>) => {
    const filterData = trainAllData.filter((item: any) => filtersValue[item.TypeOfTrain]);
    updateValue(setTrainDetailsData({ data: filterData, allData: trainAllData }));
  }
  const resetFilter = () => {
    updateValue(setTrainDetailsData({ data: trainAllData, allData: trainAllData }));
  }
  const gettingTrainDetails = async (value: any) => {
    const obj: Record<string, string | null> = {
      DepartureStation: value["departureStation"],
      DestinationStation: value["destinationStation"],
      JourneyDate: value["travelDate"],
      DepartureTime: value["leavingTimeHr"] ? `${value["leavingTimeHr"]}:${value["leavingTimeMinutes"]}` : null,
      DestinationTime: value["ReachTimeHr"] ? `${value["ReachTimeHr"]}:${value["ReachTimeMinutes"]}` : null,
    };
    const response = await APIService.getData("/train/getTrains", obj);
    if (response.success) {
      updateValue(setTrainDetailsData({ data: response.data, allData: response.data }));
    }
    return response;
  };
  const genrateSideFilters = async () => {
    const type: Array<string> = ["Train Type"];
    const response = await APIService.getData("/train/filterOption");
    const filterArr: Array<ISideFilter> = [];
    if (response.success) {
      const { TypeOfTrainData } = response.data;
      for (const item of type) {
        let obj: ISideFilter = { header: "", fields: [] };
        if (item === "Train Type") {
          obj = {
            header: item,
            fields: TypeOfTrainData.map((ele: any) => {
              return { labelName: ele.TrainType, fieldType: "checkbox" };
            }),
          };
        }
        filterArr.push(obj);
      }
    }
    filterArr.push({ header: "Train Timing", fields: [{ labelName: "Morning Trains (4AM-11AM)", fieldType: "checkbox" },{ labelName: "Afternoon Trains (11AM-4PM)", fieldType: "checkbox" },{ labelName: "Evening Trains (4PM-7PM)", fieldType: "checkbox" },{ labelName: "Night Trains (7PM-4AM)", fieldType: "checkbox" }] })
    return filterArr;
  };
  const bookingData = useAppSelector((state) => state.TrainBookingDetailsSlice);
  const getPrice = async (coachType: string, trainCode: string) => {
    const response = await APIService.getData("/train/getPrice", {
      DepartureStation: bookingData.departureStation,
      DestinationStation: bookingData.destinationStation,
      Adults: bookingData.Adults,
      Kids: bookingData.Kids,
      seniorCitizen: bookingData.seniorCitizen,
      trainCode,
      coachType
    });
    if (response.success) {
      return response.data;
    }
    return 0;
  };
  const ticketBookingOptions = async (trainCode: string) => {
    const response = await APIService.getData("/train/getParticularTrainCoachDetails", { trainCode });
    const passengerCoachType: Array<IOptions> = [];
    if (response.success) {
      for (const item of response.data) {
        passengerCoachType.push({ label: item, value: item });
      }
    }
    const passengerAge: Array<IOptions> = [];
    for (let i = 0; i <= 100; i++) {
      const str: string = `${i < 10 ? `0${i}` : i.toString()}`;
      passengerAge.push({ label: str, value: i });
    }
    return {
      passengerAge,
      passengerCoachType,
      passengerGender: TicketBookingConfig.options.passengerGender,
      passengerCategory: TicketBookingConfig.options.passengerCategory,
    }
  }
  const getPriceForEachSeat = async (trainCode: string, departureStation: string, destinationStation: string) => {
    const response = await APIService.getData("/train/getPriceOfTrainSeat", {
      trainCode,
      departureStation,
      destinationStation
    });
    if (response.success) {
      return response.data;
    }
    return [];
  }
  const calculatePriceAccordingToSeat = (seatPrices: number, category: string) => {
    switch (category) {
      case "Child": return seatPrices * 0.5;
      case "Adult": return seatPrices;
      case "Senior Citizen": return seatPrices * 0.8;
      default: return 0;
    }
  }
  const addNewPassenger = (prevValue: ITrainTicketBookingInterface) => {
    const newPassenger: ITrainTicketBookingInterface = {
      departureStation: prevValue.departureStation,
      destinationStation: prevValue.destinationStation,
      trainCode: prevValue.trainCode,
      passengerName: "",
      passengerAge: "",
      passengerGender: "",
      passengerCategory: prevValue.passengerCategory,
      passengerCoachType: prevValue.passengerCoachType,
      passengerPhone: "",
      journeyEndDate: prevValue.journeyEndDate,
      journeyStartDate: prevValue.journeyStartDate,
      departureTime: prevValue.departureTime,
      destinationTime: prevValue.destinationTime,
      trainName: prevValue.trainName,
    }
    return newPassenger;
  }
  useEffect(() => {
    genrateBookingOption().then((opt) => {
      setBookingOption(opt);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { addNewPassenger, bookingOption, gettingTrainDetails, genrateSideFilters, getPrice, applyFilter, resetFilter, ticketBookingOptions, getPriceForEachSeat, calculatePriceAccordingToSeat };
};

export default useTrainBooking;
