import { StepProps } from "antd";
import AddTrainConfig from "../Service/Config/AddTrainConfig";
import APIService from "../Service/APIServices/APIService";
import { MessageInstance } from "antd/es/message/interface";
import CommonConfig from "../Service/Config/CommonConfig";
import { ITrainStops } from "../Service/Interface/AddTrainInterface";

const useAddTrainFunc = (messageAPI?: MessageInstance) => {
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
      const { typeOfTrainData, typeOfCoachData, placesData } = response.data;
      console.log("Data  ", typeOfTrainData, typeOfCoachData, placesData);
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
      messageAPI.destroy();
      return {
        TypeOfTrain,
        TypeOfCoach,
        DestinationStation: Places,
        DepartureStation: Places,
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
    messageAPI?.loading(CommonConfig.loadingMessageAPI);
    const response = await APIService.getData("/train/getMasterDetails", {
      tableName: "Places",
    });
    messageAPI?.destroy();
    if (response.success) {
      const { data : placesData } = response;
      let prevLatitude : number = 0;
      let prevLongitude : number = 0;
      let prevStartTime : string = "";
      for (let i = 0; i < data.length; i++) {
        const curr = data[i];
        const place = placesData.find((p: any) => p.PlaceName === curr.placeName);
        if (place) {
          const { Longitude, Latitude } = place;
          let newTime : string = "";
          if (i > 0) {
            const distance = calculateDistance(prevLatitude, prevLongitude, Latitude, Longitude);
            console.log("Distance   ",distance);
            data[i].distance = distance.toString();
            newTime = calculateArrivalTime(distance , prevStartTime , value.avgSpeed);
            console.log("Time  ",newTime);
            data[i].time = newTime;
          } else {
            data[i].distance = "0";
            data[i].time = value.time
          }
          prevLatitude = Latitude;
          prevLongitude = Longitude;
          prevStartTime = i === 0 ? value.time : newTime;
        }
      }
    } else {
      // messageAPI?.error();
    }
    return data;
  };
  return {
    genratingPreview,
    getTrainDetailsOptions,
    genratedStopsConfig,
    modifyConfig,
  };
};

export default useAddTrainFunc;
