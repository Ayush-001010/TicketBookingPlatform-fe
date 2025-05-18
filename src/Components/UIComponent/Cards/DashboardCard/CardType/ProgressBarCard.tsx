import React from "react";
import ICardType from "./ICardType";
import { Progress } from "antd";

const ProgressBarCard : React.FunctionComponent<ICardType> = ({ item }) => {
    return (
        <div>
            <h1>{item.displayName}</h1>
            <Progress percent={item.value }/>
        </div>
    )
};

export default ProgressBarCard;