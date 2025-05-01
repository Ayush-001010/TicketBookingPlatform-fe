import React from "react";
import styles from "./HeaderCardComponent.module.css";

const HeaderCardSubPoint: React.FunctionComponent<{ Title: string, Response: string }> = ({ Title, Response }) => {
    return (
        <div className={styles.HeaderCardSubPoint}>
            <p>
                <span>{Title}</span>
                <span> : </span>
                <span>{Response}</span>
            </p>
        </div>
    )
};

export default HeaderCardSubPoint;