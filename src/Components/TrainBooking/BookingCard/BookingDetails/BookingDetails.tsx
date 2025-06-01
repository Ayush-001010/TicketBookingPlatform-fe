import React, { useEffect, useState } from "react";
import IBookingDetails from "./IBookingDetails";
import { ITrainTicketBookingInterface } from "../../../../Service/Interface/TrainBookingInterface";
import { Input, Select } from "antd";
import useTrainBooking from "../../../../hooks/useTrainBooking";
import styles from "./BookingDetails.module.css";

const BookingDetails: React.FunctionComponent<IBookingDetails> = ({ data, options, seatPrices , passengerNumber , startCompletingProcess , passingDataToParentFunc}) => {
    const { calculatePriceAccordingToSeat } = useTrainBooking();
    const [value, setValue] = useState<ITrainTicketBookingInterface | null>(null);
    const [errorFields , setErrorFields] = useState<Array<string>>([]);

    const changeSelectHandler = (newValue: any, backendName: string) => {
        if (backendName === "passengerAge" && seatPrices) {
            const newAge = Number(newValue);
            if (newAge <= 10) {
                setValue((prev: any) => {
                    return { ...prev, passengerCategory: "Child" };
                });
            }
            else if (newAge > 10 && newAge <= 65) {
                setValue((prev: any) => {
                    return { ...prev, passengerCategory: "Adult" };
                });
            }
            else if (newAge > 65) {
                setValue((prev: any) => {
                    return { ...prev, passengerCategory: "Senior Citizen" };
                });
            }
        }
        setValue((prev: any) => {
            return { ...prev, [backendName]: newValue };
        });
    }
    const changeInputHandler = (event: any, backendName: string) => {
        setValue((prev: any) => {
            return { ...prev, [backendName]: event.target.value };
        })
    }
    useEffect(() => { setValue(data) }, [data]);
    useEffect(() => {
        if (seatPrices && value) {
            const price = calculatePriceAccordingToSeat(seatPrices[value?.passengerCoachType], value?.passengerCategory);
            setValue((prev: any) => {
                return { ...prev, price: price };
            })
        }
    }, [seatPrices, value?.passengerCategory, value?.passengerCoachType]);
    useEffect(()=>{
        if(startCompletingProcess && value){
            const keys = Object.keys(value);
            let isError : boolean = false;
            const val : any = value;
            const errFields : Array<string> = [];
            for(const key of keys){
                if(!val[key] || val[key].toString().trim().length === 0){
                    isError = true;
                    errFields.push(key);
                }
            }
            setErrorFields(errFields);
            passingDataToParentFunc(isError , value);
        }
    },[startCompletingProcess])
    return (
        <div className={styles.css1}>
            <div className={styles.downPart}>
                <div className={styles.passengerNumber}>
                    <p><span>Passenger No</span> <span>{passengerNumber}</span></p>
                </div>
                <div className={styles.sideBySide}>
                    <div className={styles.inputFieldCss}>
                        <label>Passenger Name  </label>
                        <Input className={errorFields.includes("passengerName") ? styles.error : ""}  value={value?.passengerName} onChange={(e) => changeInputHandler(e, "passengerName")} />
                    </div>
                    <div className={styles.selectFieldCss}>
                        <label>Passenger Age  </label>
                        <Select className={errorFields.includes("passengerAge") ? styles.error : ""} options={options ? options.passengerAge : []} onChange={(newValue) => changeSelectHandler(newValue, "passengerAge")} />
                    </div>
                </div>
                <div className={styles.sideBySide}>
                    <div className={styles.inputFieldCss}>
                        <label>Passenger Phone Number  </label>
                        <Input className={errorFields.includes("passengerPhone") ? styles.error : ""} value={value?.passengerPhone} onChange={(e) => changeInputHandler(e, "passengerPhone")} />
                    </div>
                    <div className={styles.selectFieldCss}>
                        <label>Passenger Gender  </label>
                        <Select className={errorFields.includes("passengerGender") ? styles.error : ""} options={options ? options.passengerGender : []} onChange={(newValue) => changeSelectHandler(newValue, "passengerGender")} />
                    </div>
                </div>
                <div className={styles.sideBySide}>
                    <div className={styles.selectFieldCss}>
                        <label>Passenger Category  </label>
                        <Select className={errorFields.includes("passengerCategory") ? styles.error : ""} disabled options={options ? options.passengerCategory : []} value={value?.passengerCategory} onChange={(newValue) => changeSelectHandler(newValue, "passengerCategory")} />
                    </div>
                    <div className={styles.selectFieldCss}>
                        <label>Coach Type  </label>
                        <Select className={errorFields.includes("passengerCoachType") ? styles.error : ""} options={options ? options.passengerCoachType : []} value={value?.passengerCoachType} onChange={(newValue) => changeSelectHandler(newValue, "passengerCoachType")} />
                    </div>
                </div>
                <div className={styles.sideBySide}>
                    <div className={styles.inputFieldCss}>
                        <label>Price  </label>
                        <Input className={errorFields.includes("price") ? styles.error : ""} disabled value={value?.price} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookingDetails;