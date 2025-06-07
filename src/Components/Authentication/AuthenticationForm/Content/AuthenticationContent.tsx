import React, { useEffect, useState } from "react";
import IAuthenticationContent from "./IAuthenticationContent";
import { Button, Checkbox, Input, message } from "antd";
import styles from "./AuthenticationContent.module.css";
import Image from "../../../../Images/icons8-google-48.png"
import { IAuthenticationContentValue } from "../../../../Service/Interface/Authentication";



const AuthenticationContent: React.FunctionComponent<IAuthenticationContent> = ({ changeForm, isLogIn , passingValueToParent }) => {
    const [messageAPI , contextHandler] = message.useMessage();
    const [value, setValue] = useState<IAuthenticationContentValue>({ emailID: "", password: "", confirmPassword: "" });

    const submitHandler = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
        if(!emailRegex.test(value.emailID)){
            messageAPI.error({content : "Email Id is not valid"});
        } else if( !isLogIn && value.password !== value.confirmPassword){
            messageAPI.error({content : "Oops! Your password and confirm password don’t match. Please try again."})
        } else if(!passwordRegex.test(value.password) || value.password.length <= 7){
            messageAPI.error({content : "Oops! Your password must include at least one uppercase letter, one lowercase letter, seven characters and a number."})
        } else {
            passingValueToParent(value);
        }
    }
    const changeHandler = ({ target }: any, backendName: "emailID" | "password" | "confirmPassword") => {
        setValue((prevState) => {
            return { ...prevState, [backendName]: target.value }
        })
    }
    useEffect(()=>{
        setValue({ emailID: "", password: "", confirmPassword: "" });
    },[isLogIn])
    return (
        <div className={styles.AuthenticationContentDivCss}>
            {contextHandler}
            <div className={styles.GoogleAuthenticationDivCss}>
                <Button className={styles.GoogleAuthenticationButtonCss}>
                    <p>
                        <img src={Image} />
                    </p>
                    <p>Continue with Google</p>
                </Button>
            </div>
            <div className={styles.OrTextDivCss}>
                <p></p>
                <p>or</p>
                <p></p>
            </div>
            <div>
                <div className={styles.emailFieldCss}>
                    <label>Email</label>
                    <Input value={value.emailID} onChange={(event) => changeHandler(event , "emailID")} />
                </div>
                <div className={styles.emailFieldCss}>
                    <label>Password</label>
                    <Input type="password" value={value.password} onChange={(event) => changeHandler(event , "password")} />
                </div>
                {!isLogIn &&
                    <div className={styles.emailFieldCss}>
                        <label>Confirm Password</label>
                        <Input type="password" value={value.confirmPassword} onChange={(event) => changeHandler(event , "confirmPassword")} />
                    </div>
                }
                <div className={styles.checkboxCss}>
                    <Checkbox />
                    <label>Remember Me</label>
                </div>
                <div className={styles.buttonDivCss}>
                    <Button onClick={submitHandler}>{isLogIn ? "Log In" : "Sign Up"}</Button>
                </div>
                <div className={styles.textCss}>
                    {isLogIn && <p onClick={changeForm}>No account yet? Sign up now—it's fast, easy, and free!</p>}
                    {!isLogIn && <p onClick={changeForm}>Already have an account? Log in now to continue your journey!</p>}
                </div>
            </div>
        </div>
    )
};

export default AuthenticationContent;