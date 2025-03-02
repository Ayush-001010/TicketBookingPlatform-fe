import APIService from "../Service/APIServices/APIService";
import RailwayStationConfig from "../Service/Config/RailwayStationConfig";

const useRailwayStationAction = () => {
  const getDataFunc = async (pageNo: number, search?: string, filter?: any) => {
    let res: { success: boolean; data?: any };
    if (filter && Object.keys(filter).length > 0) {
      res = await APIService.getData("/railwayStation/getDataWithFilter", {
        pageNo,
        limitNo: 50,
        ...filter
      });
      console.log("Response   ", res);
    } else if (search && search?.length > 0) {
      res = await APIService.getData("/railwayStation/getDataWithFilter", {
        pageNo,
        limitNo: 50,
        isSearch: true,
        StationName: search,
        PlaceName: search,
        PlaceType: search,
        IsHillStation: search,
        RailwayZone: search,
      });
      console.log("Response   ", res);
    } else {
      res = await APIService.getData("/railwayStation/getData", {
        pageNo,
        limitNo: 50,
      });
    }
    return res;
  };
  const getOptionsFunc = async () => {
    const res = await APIService.getData("/railwayStation/getOptions");
    console.log("Response   ", res);
    return res;
  };
  const genrateOptionFields = (options: any) => {
    const filterFields = RailwayStationConfig.filterFields;
    if(!options) return filterFields;
    console.log("Options  ",options);
    for (const item of filterFields) {
      console.log("Item   ", item, " Options   ", options[item.backendName]);
      const val = options[item.backendName].map((curr: any) => {
        let curr1 = curr;
        if (curr === true) {
          curr = "Yes";
        } else if (curr === false) {
          curr = "No";
        }
        return { label: curr, value: curr1 };
      });
      item.options = val;
    }
    return filterFields;
  };
  const getCards = async () => {
    const res = await APIService.getData("/railwayStation/getCards");
    console.log("Response   ", res);
    return res;
  }
  return { getDataFunc, getOptionsFunc, genrateOptionFields , getCards };
};

export default useRailwayStationAction;
