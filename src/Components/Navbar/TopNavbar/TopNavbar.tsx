import React from "react";
import ITopNavbar from "./ITopNavbar";
import styles from "./TopNavbar.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../Redux/Hooks";
import NavbarConfig, { INavItems } from "../../../Service/Config/NavbarConfig";

const TopNavbar: React.FunctionComponent<ITopNavbar> = () => {
  const isAdmin: boolean = useAppSelector(
    (state) => state.AuthenticationSlice.isAdmin
  );
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
        <Link to="/signIn">Sign In</Link>
      </div>
    </div>
  );
};

export default TopNavbar;
