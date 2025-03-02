import React, { useEffect, useState } from "react";
import IRailwayStation from "./IRailwayStation";
import Dashboard from "../../UIComponent/Dashboard/Dashboard";
import RailwayStationConfig from "../../../Service/Config/RailwayStationConfig";
import useRailwayStationAction from "../../../hooks/useRailwayStationAction";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import CommonConfig from "../../../Service/Config/CommonConfig";
import { IFilter } from "../../../Service/Interface/CommonInterface";
import DisplayCard from "../../UIComponent/Cards/DisplayCard/DisplayCard";

const RailwayStation: React.FunctionComponent<IRailwayStation> = () => {
  const { getDataFunc, getOptionsFunc, genrateOptionFields, getCards } =
    useRailwayStationAction();
  const [messageAPI, contextHandler] = message.useMessage();
  const [pageNo, setPageNo] = useState(0);
  const [search, setSearch] = useState("");
  const [filterObj, setFilterObj] = useState<Record<string, any>>({});
  const [dashboardData, setDashboardData] = useState<Array<any>>([]);
  const [filterField, setFilterField] = useState<Array<IFilter>>([]);
  const { data: response, isLoading } = useQuery({
    queryFn: () => getDataFunc(pageNo, search, filterObj),
    queryKey: ["RailwayStation", pageNo, search, filterObj],
    retry: 3,
  });
  const { data: responseOption } = useQuery({
    queryKey: ["RailwayStationOptions"],
    queryFn: () => getOptionsFunc(),
  });
  const { data: responseCards, isLoading: loadingOptions } = useQuery({
    queryKey: ["RailwayStationCards"],
    queryFn: () => getCards(),
  });
  const getNewPageData = () => {
    setPageNo((prevState) => prevState + 1);
  };
  const searchFunc = (str: string) => {
    setPageNo(0);
    setDashboardData([]);
    setFilterObj({});
    setSearch(str);
  };
  const applyFilter = (filter: any) => {
    setPageNo(0);
    setSearch("");
    setFilterObj({ ...filter });
    setDashboardData([]);
  };
  useEffect(() => {
    if (isLoading) {
      messageAPI.destroy();
      messageAPI.loading(CommonConfig.loadingMessageAPI);
    } else {
      messageAPI.destroy();
      setFilterField(genrateOptionFields(responseOption?.data));
      setDashboardData((prevState: Array<any>) => {
        return [...prevState, ...response?.data];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, messageAPI, responseOption?.data]);
  return (
    <div>
      {contextHandler}
      <DisplayCard value={loadingOptions ? {} : responseCards?.data[0]} />
      <Dashboard
        columns={RailwayStationConfig.dashboardColumns}
        title={RailwayStationConfig.dashboardTitle}
        data={dashboardData}
        changeHandler={getNewPageData}
        searchFunc={searchFunc}
        filterFields={filterField}
        filterFunc={applyFilter}
        cardValues={responseCards?.data}
      >
        <Dashboard.Headers />
        <Dashboard.Search />
        <Dashboard.Filter />
      </Dashboard>
    </div>
  );
};

export default RailwayStation;
