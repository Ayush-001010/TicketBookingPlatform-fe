import { Progress } from 'antd';
import React from 'react';
import styles from "./HeaderCardComponent.module.css";

const HeaderCardProgressBar : React.FunctionComponent<{ displayName : string , value : number}> = ({displayName , value}) => {
    return (
        <div className={styles.headerCardProgressBar}>
            <h1>{displayName}</h1>
            <Progress percent={value} status='active' />
        </div>
    )
};

export default HeaderCardProgressBar;