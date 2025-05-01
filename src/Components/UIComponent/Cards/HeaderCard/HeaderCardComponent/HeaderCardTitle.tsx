import React from 'react';
import styles from "./HeaderCardComponent.module.css";

const HeaderCardTitle : React.FunctionComponent<{title : string}> = ({title}) => {
    return (
        <div className={styles.headerCardTitle}>
            <h1>{title}</h1>
        </div>
    )
};

export default HeaderCardTitle;