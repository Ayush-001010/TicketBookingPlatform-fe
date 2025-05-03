import React from "react";
import IState from "./IState";
import styles from "./State.module.css";
import { useQuery } from "@tanstack/react-query";
import useRailwayDetails from "../../../hooks/useRailwayDetails";
import HeaderCard from "../../UIComponent/Cards/HeaderCard/HeaderCard";
import RailwayDetailsConfig from "../../../Service/Config/RailwayDetailsConfig";
import SearchBar from "../../UIComponent/SearchBar/SearchBar";
import PageTitle from "../../UIComponent/PageTitle/PageTitle";

const State: React.FunctionComponent<IState> = () => {
    const { getStates } = useRailwayDetails();
    const { data: stateData, isLoading } = useQuery({
        queryFn: getStates,
        queryKey: ["state"]
    });
    const genratingProgressBar = (item: any) => {
        const progressBarArray = [];
        if (item.TotalStations === 0) item.TotalStations = 1;
        progressBarArray.push({ displayName: "Active Stations", value: item.ActiveStations / item.TotalStations * 100 });
        progressBarArray.push({ displayName: "In-Active Stations", value: item.InactiveStations / item.TotalStations * 100 });
        progressBarArray.push({ displayName: "Junction Stations", value: item.JunctionStations / item.TotalStations * 100 });
        progressBarArray.push({ displayName: "Terminal Stations", value: item.TerminalStations / item.TotalStations * 100 });
        progressBarArray.push({ displayName: "Central Stations", value: item.CentralStations / item.TotalStations * 100 });
        return progressBarArray;
    }
    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <PageTitle title={RailwayDetailsConfig.StateDashboardHeader}/>
            <div className={styles.css1}>
                <SearchBar placeholder="Ex:- Maharashtra" />
            </div>
            <div className={styles.css4}>
                {stateData?.map((item: any) => {
                    const progressBarArray = genratingProgressBar(item);
                    return <HeaderCard title={item.StateName} progressBarInfo={progressBarArray} fotter={RailwayDetailsConfig.stateFooterConfig}/>
                })}
            </div>
        </div>
    )
}

export default State;