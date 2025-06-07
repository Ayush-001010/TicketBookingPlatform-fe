import React, { use, useState } from "react";
import IAuthenticationForm from "./IAuthenticationForm";
import styles from "./AuthenticationForm.module.css";
import AuthenticationHeader from "./Header/AuthenticationHeader";
import AuthenticationContent from "./Content/AuthenticationContent";
import { IAuthenticationContentValue } from "../../../Service/Interface/Authentication";
import useAuthentication from "../../../hooks/useAuthentication";
import { message } from "antd";
import { useAppDispatch } from "../../../Redux/Hooks";
import { isSignIn } from "../../../Redux/Slices/Authentication";
import { useNavigate } from "react-router-dom";
import AfterSuccessfullyAuthenticated from "../../UIComponent/Popup/AfterSuccessfullyAuthenticated/AfterSuccessfullyAuthenticated";

const AuthenticationForm: React.FunctionComponent<IAuthenticationForm> = () => {
    const [messageAPI, contextHandler] = message.useMessage();
    const [isUserSuccessfullyLoggedIn , setIsUserSuccessfullyLoggedIn] = useState({ isLogin : false , IsAdmin : false});
    const [isLogIn, setIsLogIn] = useState<boolean>(true);
    const { signUpHandler, signInHandler } = useAuthentication();
    const [isOpenPopUp, setIsOpenPopUp] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const closePopUpHandler = () => {
        setIsOpenPopUp(false);
        if (!isLogIn) {
            setIsLogIn(true);
        } else {
            dispatch(isSignIn({...isUserSuccessfullyLoggedIn}))
            navigate("/");
        }
    }
    const changeHandler = () => {
        setIsLogIn((prevState) => !prevState);
    }
    const submitHandler = async (value: IAuthenticationContentValue) => {
        console.log("Value  ", value);
        messageAPI.destroy();
        messageAPI.loading({ content: "loading...", duration: 0 });
        let response;
        if (!isLogIn) {
            response = await signUpHandler(value);
        } else {
            response = await signInHandler(value);
            if(response.success){
                setIsUserSuccessfullyLoggedIn({isLogin : true , IsAdmin : response.data?.IsAdmin});
            }
        }
        messageAPI.destroy();
        if (response.success) {
            setIsOpenPopUp(true);
        } else {
            if (response?.error && response.error.length > 0) {
                messageAPI.error({ content: response.error })
            } else {
                messageAPI.error({ content: "Something Went Wrong!!" });
            }
        }
    }
    return (
        <div className={styles.AuthenticationFormCss}>
            {contextHandler}
            <AuthenticationHeader />
            <AuthenticationContent isLogIn={isLogIn} changeForm={changeHandler} passingValueToParent={submitHandler} />
            <AfterSuccessfullyAuthenticated open={isOpenPopUp} decisionFunc={closePopUpHandler} isLogIn={isLogIn} />
        </div>
    )
};

export default AuthenticationForm;