import React from "react";
import ICalendar from "./ICalendar";
import { Calendar, CalendarProps } from "antd";
import { Dayjs } from "dayjs";
import styles from "./JourneyCalendar.module.css";

const JourneyCalendar: React.FunctionComponent<ICalendar> = ({ data }) => {
    const cellRenderHandler: CalendarProps<Dayjs>['cellRender'] = (current: Dayjs, info: any) => {
        if (info.type === 'date') {
            const date = new Date(current.year(), current.month(), current.date());

            const journeyItems = data.filter((item) => {
                const journeyDate = new Date(item.journeyDate);
                return journeyDate.getDate() === date.getDate() &&
                    journeyDate.getMonth() === date.getMonth() &&
                    journeyDate.getFullYear() === date.getFullYear();
            });

            if (journeyItems.length > 0) {
                return (
                    <ul className={styles.calenderDateCss} >
                        <li className={styles.calenderDateTextCss} key={1}>
                            <p>{journeyItems[0].TrainName}</p>
                            <p>{journeyItems[0].TrainCode}</p>
                        </li>
                    </ul>
                );
            }
        }
        return "";
    };

    return (
        <div className={styles.mainDivCss}>
            <div className={styles.calenderDivCss}>
                <Calendar cellRender={cellRenderHandler} />
            </div>
        </div>
    );
};

export default JourneyCalendar;
