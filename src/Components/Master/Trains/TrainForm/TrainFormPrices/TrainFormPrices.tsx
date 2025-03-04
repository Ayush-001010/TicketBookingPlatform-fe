import React from "react";
import { useState , useEffect } from "react";
import ITrainFormPrices from "./ITrainFormPrices";
import PriceHeaders from "./PriceHeaders/PriceHeaders";
import { ITrainStops } from "../../../../../Service/Interface/AddTrainInterface";
import Stops from "../TrainFormStops/Stops/Stops";
import useAddTrainFunc from "../../../../../hooks/useAddTrainFunc";


const TrainFormPrices : React.FunctionComponent<ITrainFormPrices> = ({coachTypes , stops}) => {
    const  { setPrice } = useAddTrainFunc();
    const [data , setData] = useState<Array<ITrainStops>>([]);

    const changeHandlerPrice = (price : number , coachType : string) => {
        const modifyData = setPrice(stops , price , coachType);
        console.log("Modify Data    ",modifyData);
        setData(modifyData);
    }
    useEffect(()=>{
        setData(stops);
    },[stops])
    return (
        <div>
            <div>
                <PriceHeaders coachTypes={coachTypes} passingPriceToParent={changeHandlerPrice} />
            </div>
            <div>
                {data.map((currItem : ITrainStops) => (
                    <Stops  type="Price" value={currItem} passingValueToParent={() => { } } disabled={true} options={[]} index={0} deleteStop={undefined} />
                ))}
            </div>
        </div>
    )
};


export default TrainFormPrices;