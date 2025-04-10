import React from "react";
import { useState, useEffect } from "react";
import ITrainFormPrices from "./ITrainFormPrices";
import PriceHeaders from "./PriceHeaders/PriceHeaders";
import { ITrainStops } from "../../../../../Service/Interface/AddTrainInterface";
import Stops from "../TrainFormStops/Stops/Stops";
import useAddTrainFunc from "../../../../../hooks/useAddTrainFunc";
import styles from "./TrainFormPrices.module.css";
import { Button } from "antd";

const TrainFormPrices: React.FunctionComponent<ITrainFormPrices> = ({
  coachTypes,
  stops,
  passingDataToParentFunc,
  backHandlerFunc
}) => {
  const { setPrice } = useAddTrainFunc();
  const [data, setData] = useState<Array<ITrainStops>>([]);

  const backHandler = () => {
    backHandlerFunc();
  }
  const passingDataToParent = () => {
    passingDataToParentFunc(data)
  }
  const changeHandlerPrice = (price: number, coachType: string , perCabinSeat : number , totalCabin : number) => {
    const modifyData = setPrice(stops, price, coachType , perCabinSeat , totalCabin);
    passingDataToParentFunc({coachType : coachType , perCabinSeat : perCabinSeat , totalCabin : totalCabin} , "Coach")
    setData([...modifyData]);
  };
  const changeHandlerPriceValue = (value : string , backendName : string , index: number) => {
    setData((prevState : any) => {
      prevState[index].price[backendName] = value;
      return [...prevState];
    })
  }
  useEffect(() => {
    setData(stops);
  }, [stops]);
  return (
    <div>
      <div>
        <PriceHeaders
          coachTypes={coachTypes}
          passingPriceToParent={changeHandlerPrice}
        />
      </div>
      <div className={styles.css1}>
        {data.map((currItem: ITrainStops, index: number) => (
          <>
            {currItem.price && (
              <Stops
                type="Price"
                value={{...currItem}}
                passingValueToParent={changeHandlerPriceValue}
                disabled={true}
                options={[]}
                index={index}
                deleteStop={undefined}
              />
            )}
            {index !== data.length - 1 && (
              <div className={styles.css2}>
                <div className={styles.css3}>
                  <p />
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      <div className={styles.css4}>
        <Button onClick={backHandler}>Back</Button>
        <Button onClick={passingDataToParent}>Next</Button>
      </div>
    </div>
  );
};

export default TrainFormPrices;
