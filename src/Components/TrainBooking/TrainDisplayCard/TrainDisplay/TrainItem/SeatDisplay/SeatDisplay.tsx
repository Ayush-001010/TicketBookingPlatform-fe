import React, { useEffect } from "react";
import ISeatDisplay from "./ISeatDisplay";
import { socket } from "../../../../../../socket";

const SeatDisplay: React.FunctionComponent<ISeatDisplay> = ({ data }) => {
  useEffect(() => {
    if (data) {
      socket.emit("train-details", {
        trainCode: data.TrainCode,
        journeyDate: new Date("2025-03-15"),
        DepartureStation : "Jamshedpur",
        DestinationStation : "HOWRAH"
      });
      socket.on("train-details-data",value => {
        console.log("Value  ",value);
      })
    }
  }, [data]);

  return <p>Hello</p>;
};

export default SeatDisplay;
