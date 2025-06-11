import React from "react";
import IFields from "./IFields";
import { Select } from "antd";
import styles from "../Filter.module.css";

const DropDown : React.FunctionComponent<IFields> = ({ displayName , backendName , options , changeHandler , value}) => {
    const changeHandlerFunc = (newValue : string | [] | null ) => {
        changeHandler(newValue , backendName);
    }
    return (
        <div className={styles.dropDownDivCss}>
            <p>{displayName}</p>
            <Select options={options} onChange={changeHandlerFunc} value={value}  />
        </div>
    )
};

export default DropDown;