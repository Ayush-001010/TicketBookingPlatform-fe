import { IAuthenticationContentValue } from "../../../../Service/Interface/Authentication";

export default interface IAuthenticationContent{
    isLogIn : boolean;
    changeForm : () => void;
    passingValueToParent : (value : IAuthenticationContentValue) => void;
}