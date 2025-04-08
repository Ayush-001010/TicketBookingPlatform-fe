import React from "react";
import { useMemo } from "react";
import ITopNavbar from "./ITopNavbar";
import styles from "./TopNavbar.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../Redux/Hooks";
import NavbarConfig, { INavItems } from "../../../Service/Config/NavbarConfig";
import { Dropdown } from "antd";

const TopNavbar: React.FunctionComponent<ITopNavbar> = () => {
  const isAdmin: boolean = useAppSelector(
    (state) => state.AuthenticationSlice.IsAdmin
  );
  const userProfileItems  = useMemo(()=>{
    const items = NavbarConfig.userProfileItems.map((item , index) => {
      return {
        key : index,
        label : <Link to={`/${item.replace(/\s+/g, "")}`} className={styles.css6}>{item}</Link>,
      }
    })
    return items;
  },[]);


  return (
    <div className={styles.css1}>
      <div className={styles.css4}>
        {NavbarConfig.navbarItems.map((currItem: INavItems) => {
          if (
            currItem.role === "All" ||
            (currItem.role === "Admin" && isAdmin) ||
            (currItem.role === "Customer" && !isAdmin)
          ) {
            return (
              <div className={styles.css3}>
                <Link to={currItem.navLink}>{currItem.displayName}</Link>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className={styles.css2}>
        <Dropdown menu={{ items: userProfileItems }} placement="bottom">
          <i className={`${"bi bi-person-circle"} ${styles.css5}`} />
        </Dropdown>
      </div>
    </div>
  );
};

export default TopNavbar;
