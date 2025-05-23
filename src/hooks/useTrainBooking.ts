import { useCallback, useEffect, useState } from "react";
import {
  IBookingOptions,
  ISideFilter,
} from "../Service/Interface/TrainBookingInterface";
import TrainBookingConfig from "../Service/Config/TrainBookingConfig";
import { IOptions } from "../Service/Interface/CommonInterface";
import APIService from "../Service/APIServices/APIService";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import { setTrainDetailsData } from "../Redux/Slices/TrainDetails";

const useTrainBooking = () => {
  const updateValue = useAppDispatch();

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
      updateValue(setTrainDetailsData(response.data));
    }
    return response;
  };
  const genrateSideFilters = async () => {
    const type: Array<string> = ["Train Type", "Ticket Price", "Facilites"];
    const response = await APIService.getData("/train/filterOption");
    const filterArr: Array<ISideFilter> = [];
    if (response.success) {
      const { TypeOfTrainData, TrainFacilites } = response.data;
      for (const item of type) {
        let obj: ISideFilter = { header: "", fields: [] };
        if (item === "Train Type") {
          obj = {
            header: item,
            fields: TypeOfTrainData.map((ele: any) => {
              return { labelName: ele.TrainType, fieldType: "checkbox" };
            }),
          };
        } else if (item === "Facilites") {
          obj = {
            header: item,
            fields: TrainFacilites.map((ele: any) => {
              return { labelName: ele.FacilitesName, fieldType: "checkbox" };
            }),
          };
        } else {
          obj = {
            header: item,
            fields: [
              { labelName: "up to 500", fieldType: "radio", radioID: "price" },
              { labelName: "up to 1000", fieldType: "radio", radioID: "price" },
              { labelName: "up to 1500", fieldType: "radio", radioID: "price" },
            ],
          };
        }
        filterArr.push(obj);
      }
    }
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
    if(response.success){
      return response.data;
    }
    return 0;
  };
  useEffect(() => {
    genrateBookingOption().then((opt) => {
      setBookingOption(opt);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { bookingOption, gettingTrainDetails, genrateSideFilters, getPrice };
};

export default useTrainBooking;
