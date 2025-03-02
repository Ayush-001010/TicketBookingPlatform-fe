import { StepProps } from "antd";
import AddTrainConfig from "../Service/Config/AddTrainConfig";
import APIService from "../Service/APIServices/APIService";
import { MessageInstance } from "antd/es/message/interface";
import CommonConfig from "../Service/Config/CommonConfig";

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
    if(!messageAPI) return;
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
      return { TypeOfTrain, TypeOfCoach, DestinationStation : Places,DepartureStation:Places };
    } else {
      
    }
  };
  return { genratingPreview, getTrainDetailsOptions };
};

export default useAddTrainFunc;
