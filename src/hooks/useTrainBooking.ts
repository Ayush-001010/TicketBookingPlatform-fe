import { useCallback, useEffect, useState } from "react";
import { IBookingOptions } from "../Service/Interface/TrainBookingInterface";
import TrainBookingConfig from "../Service/Config/TrainBookingConfig";
import { IOptions } from "../Service/Interface/CommonInterface";
import APIService from "../Service/APIServices/APIService";

const useTrainBooking = () => {
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
              arr.push({ value: item.PlaceName , label: item.PlaceName });
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
  const gettingTrainDetails = async (value : any) => {
    const obj : Record<string , string> = {
      DepartureStation : value["departureStation"],
      DestinationStation : value["destinationStation"],
      JourneyDate : value["travelDate"],
      DepartureTime : `${value["leavingTimeHr"]}:${value["leavingTimeMinutes"]}`,
      DestinationTime : `${value["ReactTimeHr"]}:${value["ReactTimeMinutes"]}`,
    }
    const response = await APIService.getData("/train/getTrains",obj);
    console.log("Response ",response);
  }
  useEffect(() => {
    genrateBookingOption().then((opt) => {
      setBookingOption(opt);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { bookingOption  , gettingTrainDetails};
};

export default useTrainBooking;
