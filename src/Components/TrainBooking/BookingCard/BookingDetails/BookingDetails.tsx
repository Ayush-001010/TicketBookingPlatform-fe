import React, { useEffect, useState } from "react";
import IBookingDetails from "./IBookingDetails";
import { ITrainTicketBookingInterface } from "../../../../Service/Interface/TrainBookingInterface";
import { Input, Select } from "antd";
import useTrainBooking from "../../../../hooks/useTrainBooking";
import styles from "./BookingDetails.module.css";

const BookingDetails: React.FunctionComponent<IBookingDetails> = ({ data, options, seatPrices }) => {
    const { calculatePriceAccordingToSeat } = useTrainBooking();
    const [value, setValue] = useState<ITrainTicketBookingInterface | null>(null);

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
    return (
        <div className={styles.css1}>
            <div className={styles.topPart}>
                <div className={styles.center}>
                    <h1 className={styles.headerText}>{data.trainName}</h1>
                </div>
                <div>
                    <div className={styles.sideBySide}>
                        <h2 className={styles.fields1}>Departure Station: <span>{data.departureStation}</span></h2>
                        <h2 className={styles.fields1}>Destination Station: <span>{data.destinationStation}</span></h2>
                    </div>
                    <div className={styles.sideBySide}>
                        <h2 className={styles.fields1}>Departure Time: <span>{data.departureTime}</span></h2>
                        <h2 className={styles.fields1}>Destination Time: <span>{data.destinationTime}</span></h2>
                    </div>
                </div>
            </div>
            <div className={styles.downPart}>
                <div className={styles.sideBySide}>
                    <div className={styles.inputFieldCss}>
                        <label>Passenger Name  </label>
                        <Input type="text" value={value?.passengerName} onChange={(e) => changeInputHandler(e, "passengerName")} />
                    </div>
                    <div className={styles.selectFieldCss}>
                        <label>Passenger Age  </label>
                        <Select options={options ? options.passengerAge : []} onChange={(newValue) => changeSelectHandler(newValue, "passengerAge")} />
                    </div>
                </div>
                <div className={styles.sideBySide}>
                    <div className={styles.inputFieldCss}>
                        <label>Passenger Phone Number  </label>
                        <Input type="text" value={value?.passengerPhone} onChange={(e) => changeInputHandler(e, "passengerPhone")} />
                    </div>
                    <div className={styles.selectFieldCss}>
                        <label>Passenger Gender  </label>
                        <Select options={options ? options.passengerGender : []} onChange={(newValue) => changeSelectHandler(newValue, "passengerGender")} />
                    </div>
                </div>
                <div className={styles.sideBySide}>
                    <div className={styles.selectFieldCss}>
                        <label>Passenger Category  </label>
                        <Select disabled options={options ? options.passengerCategory : []} value={value?.passengerCategory} onChange={(newValue) => changeSelectHandler(newValue, "passengerCategory")} />
                    </div>
                    <div className={styles.selectFieldCss}>
                        <label>Coach Type  </label>
                        <Select options={options ? options.passengerCoachType : []} value={value?.passengerCoachType} onChange={(newValue) => changeSelectHandler(newValue, "passengerCoachType")} />
                    </div>
                </div>
                <div className={styles.sideBySide}>
                    <div className={styles.inputFieldCss}>
                        <label>Price  </label>
                        <Input disabled type="text" value={value?.price} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookingDetails;