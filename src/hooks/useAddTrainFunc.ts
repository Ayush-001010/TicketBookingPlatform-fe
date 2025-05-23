import { StepProps } from "antd";
import AddTrainConfig from "../Service/Config/AddTrainConfig";
import APIService from "../Service/APIServices/APIService";
import { MessageInstance } from "antd/es/message/interface";
import CommonConfig from "../Service/Config/CommonConfig";
import {
  ITrainDetails,
  ITrainStops,
} from "../Service/Interface/AddTrainInterface";
import { useEffect, useState } from "react";

const useAddTrainFunc = (
  messageAPI?: MessageInstance,
  data?: ITrainDetails
) => {
  const [totalJourneyTimeValue, setTotalJourneyTimeValue] =
    useState<string>("");
  const genratingPreview = () => {
    const arr = AddTrainConfig.previewItems;
    const data: Array<StepProps> = [];
    let index: number = 0;
    for (const item of arr) {
      const obj: StepProps = {
        description: `${item}`,
      };
      data.push(obj);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      index++;
    }
    return data;
  };
  const getTrainDetailsOptions = async () => {
    if (!messageAPI) return;
    messageAPI.loading(CommonConfig.loadingMessageAPI);
    const response = await APIService.getData("/train/getOptions");
    if (response.success) {
      const { typeOfTrainData, typeOfCoachData, placesData, runningData } =
        response.data;
      const TypeOfTrain = typeOfTrainData.map((item: any) => {
        return {
          value: item.TrainType,
          label: item.TrainType,
        };
      });
      const TypeOfCoach = typeOfCoachData.map((item: any) => {
        return {
          value: item.Coach,
          label: item.Coach,
        };
      });
      const Places = placesData.map((item: any) => {
        return {
          value: item.PlaceName,
          label: item.PlaceName,
        };
      });
      const RunningSchedule = runningData.map((item: any) => {
        return {
          label: item.Schedule,
          value: item.Schedule,
        };
      });
      messageAPI.destroy();
      return {
        TypeOfTrain,
        TypeOfCoach,
        RunningSchedule,
        DestinationStation: Places,
        DepartureStation: Places,
        RunningDay: AddTrainConfig.runningDayOpt,
      };
    } else {
    }
  };
  const genratedStopsConfig = (
    data: Array<ITrainStops>,
    value: ITrainStops,
    startIndex: number,
    endIndex: number
  ) => {
    data = [
      ...data.slice(0, startIndex),
      value,
      ...data.slice(endIndex, data.length),
    ];
    return data;
  };
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  };
  const calculateArrivalTime = (
    distance: number,
    startTime: string,
    speed: number
  ): string => {
    // Convert startTime to a Date object
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);

    // Calculate travel time in hours
    const travelTimeInHours = distance / speed;

    // Calculate arrival time by adding travel time to start time
    const arrivalDate = new Date(
      startDate.getTime() + travelTimeInHours * 60 * 60 * 1000
    );
    const arrivalHours = arrivalDate.getHours().toString().padStart(2, "0");
    const arrivalMinutes = arrivalDate.getMinutes().toString().padStart(2, "0");
    return `${arrivalHours}:${arrivalMinutes}`;
  };
  const modifyConfig = async (
    data: Array<ITrainStops>,
    value: { time: string; avgSpeed: number }
  ) => {
    messageAPI?.destroy();
    messageAPI?.loading(CommonConfig.loadingMessageAPI);
    const response = await APIService.getData("/train/getMasterDetails", {
      tableName: "Places",
    });
    messageAPI?.destroy();
    if (response.success) {
      const { data: placesData } = response;
      let prevLatitude: number = 0;
      let prevLongitude: number = 0;
      for (let i = 0; i < data.length; i++) {
        const curr = data[i];
        const place = placesData.find(
          (p: any) => p.PlaceName === curr.placeName
        );
        if (place) {
          const { Longitude, Latitude } = place;
          let newTime: string = "";
          if (i > 0) {
            const distance = calculateDistance(
              prevLatitude,
              prevLongitude,
              Latitude,
              Longitude
            );
            data[i].distance = distance.toFixed(2).toString();
            newTime = calculateArrivalTime(
              distance,
              value.time,
              value.avgSpeed
            );
            data[i].time = newTime;
          } else {
            data[i].distance = "0";
            data[i].time = value.time;
          }
          data[i].TrainStoppageTime = "10";
          if (i === 0) {
            prevLatitude = Latitude;
            prevLongitude = Longitude;
          }
        }
      }
    } else {
      // messageAPI?.error();
    }
    return data;
  };
  const setPrice = (
    data: Array<ITrainStops>,
    price: number,
    coachType: string,
    perCabinSeat: number,
    totalCabin: number
  ) => {
    return data.map((curr) => ({
      ...curr,
      price: {
        ...curr.price,
        [coachType]: (Number(curr.distance) * price).toFixed(2),
      },
    }));
  };
  const totalJourneyTimeFunc = () => {
    if (!data) return;
    let totalMinutes = 0;
    const steps = data.stops.map((ele) => ele.time);
    for (let i = 0; i < steps.length - 1; i++) {
      const start = new Date(`1970-01-01T${steps[i]}:00Z`).getTime();
      const end = new Date(`1970-01-01T${steps[i + 1]}:00Z`).getTime();

      let diff = end - start;

      if (diff < 0) {
        diff += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
      }

      totalMinutes += diff / (1000 * 60); // Convert milliseconds to minutes
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    setTotalJourneyTimeValue(`${hours}hr:${minutes}mins`);
  };
  const addNewTrain = async (value: ITrainDetails) => {
    messageAPI?.destroy();
    messageAPI?.loading(CommonConfig.loadingMessageAPI);
    const response = await APIService.getData("/train/addNewTrain", value);
  };
  const getNoOfDays = (data: Array<ITrainStops>, index: number) => {
    let noOfDays = 1;
    let prevTime: number | null = null;
    let i: number = 0;
    for (const curr of data) {
      const time: string = curr.time.split(":")[0];
      const timeValue: number = Number(time);
      if (prevTime && prevTime > timeValue) {
        noOfDays = noOfDays + 1;
      }
      i++;
      if(i>index) break;
      prevTime = timeValue;
    }
    return noOfDays;
  };
  useEffect(() => {
    if (data) {
      totalJourneyTimeFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return {
    genratingPreview,
    getTrainDetailsOptions,
    genratedStopsConfig,
    modifyConfig,
    setPrice,
    totalJourneyTimeValue,
    addNewTrain,
    getNoOfDays,
  };
};

export default useAddTrainFunc;
