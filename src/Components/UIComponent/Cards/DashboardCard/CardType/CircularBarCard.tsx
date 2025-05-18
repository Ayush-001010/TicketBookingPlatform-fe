import React from "react";
import ICardType from "./ICardType";
import { Progress } from "antd";

const CircularBarCard: React.FunctionComponent<ICardType> = ({ item }) => {

    const sideIconFunc = (icon? : string) => {
        if(!icon) return ;
        switch(icon) {
            case "view" : return <i className="bi bi-eye"></i>
        }
    }
    return (
        <div>
            <div>
                <h1>{item.displayName}</h1>
                <p>
                    <span>
                        {sideIconFunc(item.sideIcon)}
                    </span>
                </p>
            </div>
            <Progress type="circle" percent={item.value}  />
        </div>
    )
};

export default CircularBarCard;