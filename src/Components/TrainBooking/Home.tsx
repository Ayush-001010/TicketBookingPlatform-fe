import React from "react";
import IHome from "./IHome";
import TrainBookingCard from "./TrainBookingCard/TrainBookingCard";
import { useAppSelector } from "../../Redux/Hooks";
import TrainDisplayCard from "./TrainDisplayCard/TrainDisplayCard";

const Home: React.FunctionComponent<IHome> = () => {
  const trainData = useAppSelector((state) => state.TrainDetailsSlice.data);
  console.log("Train Data ", trainData);
  return (
    <div>
      {trainData.length === 0 && <TrainBookingCard />}
      {trainData.length > 0 && <TrainDisplayCard /> }
    </div>
  );
};

export default Home;
