import React, { PropsWithChildren } from "react";
import styles from "./HeaderCardComponent.module.css";

const HeaderCardFooter: React.FunctionComponent<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.fotter}>
            {children}
        </div>
    )
}

export default HeaderCardFooter;