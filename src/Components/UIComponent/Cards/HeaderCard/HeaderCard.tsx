import React from "react";
import HeaderCardTitle from "./HeaderCardComponent/HeaderCardTitle";
import IHeaderCard from "./IHeaderCard";
import HeaderCardProgressBar from "./HeaderCardComponent/HeaderCardProgressBar";
import HeaderCardFooter from "./HeaderCardComponent/HeaderCardFooter";
import styles from "./HeaderCard.module.css";
import { Link } from "react-router-dom";
import HeaderCardSubPoint from "./HeaderCardComponent/HeaderCardSubPoint";

const HeaderCard: React.FC<IHeaderCard> = ({ children, title, progressBarInfo, fotter, subPoints, passingDataToParent, indexNumber }) => {
    return (
        <div className={styles.css1}>
            <HeaderCardTitle title={title || ""} />
            {progressBarInfo &&
                <div className={styles.css2}>
                    {progressBarInfo?.map(item => <HeaderCardProgressBar displayName={item.displayName} value={item.value} />)}
                </div>
            }
            {subPoints &&
                <div className={styles.css2}>
                    {subPoints.map(item => <HeaderCardSubPoint Title={item.Title} Response={item.Response} />)}
                </div>
            }
            <HeaderCardFooter>
                {fotter?.map(item => {
                    switch (item.type) {
                        case "button":
                            switch (item.buttonType) {
                                case "delete": return (
                                    <button className={styles.css3}>
                                        <i className="bi bi-trash3-fill"/>
                                    </button>
                                )
                                default: return (
                                    <button className={styles.css3} onClick={() => { if (passingDataToParent) passingDataToParent(indexNumber , item.displayName) }}>
                                        {item.navLink && <Link to={item.navLink[item.navLink.length - 1] === "/" ? `${item.navLink}${title?.replace(/\s/g, "_")}` : item.navLink}> {item.displayName} </Link>}
                                        {!item.navLink && item.displayName}
                                    </button>
                                )
                            }
                    }
                })}
            </HeaderCardFooter>
        </div>
    );
};


export default HeaderCard;
