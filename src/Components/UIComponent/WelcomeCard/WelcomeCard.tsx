import React from 'react'
import styles from './WelcomeCard.module.css';
import Trainlogo from "../../../Images/Trainlogo-removebg-preview.png";

const WelcomeCard : React.FunctionComponent<{}> = () => {
  return (
    <div className={styles.css2}>
        <div className={styles.css3}>
          <h2 className={styles.css4}>Hello,</h2>
          <h1 className={styles.css5}>welcome to!</h1>
        </div>
        <div className={styles.css6}>
          <div className={styles.css1}>
            <img src={Trainlogo} alt="Train logo"/>
          </div>
          <p>ticketbooking.com</p>
        </div>
        <div className={styles.css7}>
          <p>Embark on your journey with ease and comfort! Book your train tickets effortlessly through our user-friendly platform. Whether it’s a leisurely getaway or a daily commute, we're here to make your travels smooth and stress-free. Let's get you on track to your next adventure.</p>
        </div>
    </div>
  )
}

export default WelcomeCard;