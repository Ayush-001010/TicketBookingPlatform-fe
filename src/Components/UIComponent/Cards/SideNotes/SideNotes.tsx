import React, { PropsWithChildren } from "react";
import ISideNotes from "./ISideNotes";
import styles from "./SideNotes.module.css";

const SideNotes : React.FunctionComponent<ISideNotes & PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.css1}>
            {children}
        </div>
    )
};

export default SideNotes;