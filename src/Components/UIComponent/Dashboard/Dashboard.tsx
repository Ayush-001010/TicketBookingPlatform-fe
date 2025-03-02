import React, { PropsWithChildren, useContext, useState } from "react";
import { createContext } from "react";
import IDashboard from "./IDashboard";
import { Table, TablePaginationConfig } from "antd";
import DashBoardTitle from "./Headers/DashBoardTitle/DashBoardTitle";
import DashboardCard from "../Cards/Dashboard/DashboardCard";
import DashboardSearch from "./Headers/DashboardSearch/DashboardSearch";
import styles from "./Dashboard.module.css";
import DashboardFilter from "./Headers/DashboardFilter/DashboardFilter";
import FilterItems from "./Headers/DashboardFilter/FilterItems/FilterItems";

interface IDashboardContext {
  dashboardTitle: string;
  searchFunc?: any;
  showFilterFunc?: any;
  applyFilterFunc?: any;
  cards?: any;
}

export const DashboardContext = createContext<IDashboardContext | undefined>(
  undefined
);
export const useGetDashboardContext = () => {
  const value = useContext(DashboardContext);
  console.log("Value  ", value);
  if (!value) {
    throw new Error("Something Went Wrong");
  }
  return value;
};

const Dashboard = ({
  columns,
  title,
  children,
  data,
  changeHandler,
  searchFunc,
  filterFields,
  filterFunc,
  cardValues
}: IDashboard & PropsWithChildren) => {
  const [paginationSetting, setPaginationSetting] =
    useState<TablePaginationConfig>({
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50", "100"],
      position: ["bottomRight"],
    });
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const tableChangeHandler = (
    paginationSettingValue: TablePaginationConfig
  ) => {
    setPaginationSetting(paginationSettingValue);
    if (
      paginationSettingValue.current &&
      paginationSettingValue.pageSize &&
      paginationSettingValue.pageSize * (paginationSettingValue.current + 1) >
        data.length
    ) {
      changeHandler(paginationSettingValue);
    }
  };
  const showFilterFunc = () => {
    setShowFilter((prevState: boolean) => {
      return !prevState;
    });
  };
  const applyFilterFunc = (value: any) => {
    filterFunc(value);
  };

  return (
    <DashboardContext.Provider
      value={{
        dashboardTitle: title,
        searchFunc: searchFunc,
        showFilterFunc,
        applyFilterFunc,
        cards: cardValues,
      }}
    >
      <DashboardCard>
        <div className={styles.css1}>{children}</div>
        {showFilter && <FilterItems filterArray={filterFields} />}
        <Table
          columns={columns}
          dataSource={data}
          onChange={tableChangeHandler}
          pagination={paginationSetting}
        />
      </DashboardCard>
    </DashboardContext.Provider>
  );
};

Dashboard.Headers = DashBoardTitle;
Dashboard.Search = DashboardSearch;
Dashboard.Filter = DashboardFilter;
export default Dashboard;
