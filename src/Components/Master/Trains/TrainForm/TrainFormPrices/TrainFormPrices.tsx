import React, { useRef } from "react";
import { useState, useEffect } from "react";
import ITrainFormPrices from "./ITrainFormPrices";
import PriceHeaders from "./PriceHeaders/PriceHeaders";
import { ITrainStops } from "../../../../../Service/Interface/AddTrainInterface";
import Stops from "../TrainFormStops/Stops/Stops";
import useAddTrainFunc from "../../../../../hooks/useAddTrainFunc";
import styles from "./TrainFormPrices.module.css";
import { Button, message } from "antd";

const TrainFormPrices: React.FunctionComponent<ITrainFormPrices> = ({
  coachTypes,
  stops,
  passingDataToParentFunc,
  backHandlerFunc
}) => {
  const [messageAPI , contextHandler] = message.useMessage();
  const { setPrice } = useAddTrainFunc();
  const [data, setData] = useState<Array<ITrainStops>>([]);
  const isFirst = useRef(true);

  const backHandler = () => {
    backHandlerFunc();
  }
  const passingDataToParent = () => {
    console.log("Data ",data);
    let isFlag = false;
    data.forEach( item => {
      for(const key in item.price){
        if(item.price[key].length === 0){
          isFlag = true;
        }
      }
    } )
    if(isFlag){
      messageAPI.error({content : "All fields are required. Please complete them."});
      return;
    }
    passingDataToParentFunc(data)
  }
  const changeHandlerPrice = (price: number, coachType: string , perCabinSeat : number , totalCabin : number) => {
    const modifyData = setPrice(data, price, coachType , perCabinSeat , totalCabin);
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
    if(isFirst.current) {
    setData(stops);
    isFirst.current = false;
    }
  }, [stops]);
  return (
    <div>
      {contextHandler}
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
