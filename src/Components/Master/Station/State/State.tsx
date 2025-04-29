import React from "react";
import IState from "./IState";
import styles from "./State.module.css";
import { useQuery } from "@tanstack/react-query";
import useRailwayStations from "../../../../hooks/useRailwayStations";

const State: React.FunctionComponent<IState> = () => {
    const { getStates} = useRailwayStations();
    const {data : stateData , isLoading} = useQuery({
        queryFn: getStates,
        queryKey: ["state"]
    });
    console.log("State Data", stateData , " Loading", isLoading);
    if(isLoading) return <div>Loading...</div>
    return (
        <div>
            <div className={styles.css1}>
                <button className={styles.css2}>
                    <i className="bi bi-search" />
                </button>
                <input className={styles.css3} type="text" placeholder="Ex-Jharkhand" />
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default State;