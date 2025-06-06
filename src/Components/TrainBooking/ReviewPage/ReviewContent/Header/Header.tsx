import React from "react";
import { useAppSelector } from "../../../../../Redux/Hooks";
import styles from "../ReviewContent.module.css";

const Header : React.FunctionComponent<{}> = () => {
    const { trainName , trainCode} = useAppSelector( state => state.BookTrainTicket.data[0])

    return (
        <div className={styles.headerDiv}>
            <h1>{trainName} <span>({trainCode})</span></h1>
        </div>
    )
};

export default Header;