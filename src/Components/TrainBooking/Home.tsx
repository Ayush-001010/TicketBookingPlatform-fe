import React from "react";
import IHome from "./IHome";
import TrainBookingCard from "./TrainBookingCard/TrainBookingCard";

const Home: React.FunctionComponent<IHome> = () => {
  return (
    <div>
      <TrainBookingCard/>
    </div>
  );
};

export default Home;
