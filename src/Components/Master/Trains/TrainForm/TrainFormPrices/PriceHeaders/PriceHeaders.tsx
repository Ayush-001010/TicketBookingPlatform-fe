import React from "react";
import { useEffect, useState } from "react";
import IPriceHeaders from "./IPriceHeaders";
import { Button, Input, Radio } from "antd";

const PriceHeaders: React.FunctionComponent<IPriceHeaders> = ({
  coachTypes,
  passingPriceToParent
}) => {
  const [radioValue, setRadioValue] = useState<Record<string,boolean>>({});
  const [pricePerKilometer, setPricePerKilometer] = useState<number>();

  const changeHandlerRadio = (target: any, backendName: string) => {
    console.log("Target ", target.checked);
    setRadioValue((prevState: any) => {
      let obj = {};
      for (const curr in prevState) {
        obj = { ...obj, [curr]: backendName === curr ? true : false };
      }
      return obj;
    });
    setPricePerKilometer(0);
  };
  const changeHandlerInput = ({ target }: any) => {
    setPricePerKilometer(Number(target.value));
  };
  const clickHandler = () => {
    let coachType : string = "";
    for(const currKey in radioValue ){
      if(radioValue[currKey]){
        coachType = currKey;
        passingPriceToParent(pricePerKilometer , coachType);
        break;
      }
    }
  }
  useEffect(() => {
    if (!coachTypes) return;
    let obj: any = {};
    for (const curr of coachTypes) {
      obj[curr] = false;
    }
    setRadioValue(obj);
  }, [coachTypes]);
  return (
    <div>
      <div>
        {coachTypes.map((curr: string) => (
          <div>
            <Radio
              name="radio-coach"
              id="radio-coach"
              checked={radioValue[curr]}
              onClick={({ target }) => changeHandlerRadio(target, curr)}
            />{" "}
            {curr}
          </div>
        ))}
      </div>
      <div>
        <label>Distance per kilometer price</label>
        <Input type="number" value={pricePerKilometer} onChange={changeHandlerInput} />
      </div>
      <div>
        <Button onClick={clickHandler}>Calculate</Button>
      </div>
    </div>
  );
};

export default PriceHeaders;
