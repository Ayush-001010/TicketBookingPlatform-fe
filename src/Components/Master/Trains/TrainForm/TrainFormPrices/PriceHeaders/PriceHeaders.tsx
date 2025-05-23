import React from "react";
import { useEffect, useState } from "react";
import IPriceHeaders from "./IPriceHeaders";
import { Button, Input, Radio } from "antd";
import styles from "./PriceHeaders.module.css";

const PriceHeaders: React.FunctionComponent<IPriceHeaders> = ({
  coachTypes,
  passingPriceToParent,
}) => {
  const [radioValue, setRadioValue] = useState<Record<string, boolean>>({});
  const [pricePerKilometer, setPricePerKilometer] = useState<number>();
  const [perCabinSeat, setPerCabinSeat] = useState<number>();
  const [totalCabin, setTotalCabin] = useState<number>();

  const changeHandlerRadio = (target: any, backendName: string) => {
    setRadioValue((prevState: any) => {
      let obj = {};
      for (const curr in prevState) {
        obj = { ...obj, [curr]: backendName === curr ? true : false };
      }
      return obj;
    });
    setPricePerKilometer(undefined);
    setPerCabinSeat(undefined);
    setTotalCabin(undefined);
  };
  const changeHandlerInput = (target: any, backendName: string) => {
    if (backendName === "perCabinSeat") {
      setPerCabinSeat(Number(target.value));
    } else if (backendName === "totalCabin") {
      setTotalCabin(Number(target.value));
    } else {
      setPricePerKilometer(Number(target.value));
    }
  };
  const clickHandler = () => {
    let coachType: string = "";
    for (const currKey in radioValue) {
      if (radioValue[currKey]) {
        coachType = currKey;
        passingPriceToParent(
          pricePerKilometer,
          coachType,
          perCabinSeat,
          totalCabin
        );
        break;
      }
    }
  };
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
      <div className={styles.css2}>
        {coachTypes.map((curr: string) => (
          <div className={styles.css3}>
            <Radio
              name="radio-coach"
              id="radio-coach"
              checked={radioValue[curr]}
              onClick={({ target }) => changeHandlerRadio(target, curr)}
            />{" "}
            <label>{curr}</label>
          </div>
        ))}
      </div>
      <div className={styles.css4}>
        <div className={styles.css14}>
          <label className={styles.css15}>Total Seat in one cabin</label>
          <Input
            type="number"
            value={perCabinSeat}
            onChange={({ target }) =>
              changeHandlerInput(target, "perCabinSeat")
            }
            placeholder="Total Seat in one cabin"
          />
        </div>
        <div className={styles.css14}>
          <label className={styles.css15}>Total Cabin</label>
          <Input
            type="number"
            value={totalCabin}
            onChange={({ target }) => changeHandlerInput(target, "totalCabin")}
            placeholder="Total Cabins"
          />
        </div>
        <div className={styles.css14}>
          <label className={styles.css15}>Distance per kilometer price</label>
          <Input
            type="number"
            value={pricePerKilometer}
            onChange={({ target }) => changeHandlerInput(target, "distane")}
            placeholder="Distance per kilometer price"
          />
        </div>
        <div className={styles.css16}>
          <Button onClick={clickHandler}>
            <i className="bi bi-gear" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceHeaders;
