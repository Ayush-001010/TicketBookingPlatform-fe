import React from "react";
import IAuthenticationCard from "./IAuthenticationCard";
import Image from "../../../Images/anime-landscape-person-traveling.jpg";
import styles from "./AuthenticationCard.module.css";
import AuthenticationConfig from "../../../Service/Config/AuthenticationConfig";

const AuthenticationCard: React.FunctionComponent<IAuthenticationCard> = () => {
    return (
        <div className={styles.imageCardDivCss}>
            <img src={Image} alt="Something" />
            <p className={styles.contentCss}>{AuthenticationConfig.welcomeCardContent}</p>
        </div>
    )
};

export default AuthenticationCard;