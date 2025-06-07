import APIService from "../Service/APIServices/APIService";
import { IAuthenticationContentValue } from "../Service/Interface/Authentication";

const useAuthentication = () => {
  const signUpHandler = async (value: IAuthenticationContentValue) => {
    const response = await APIService.getData("/authentication/signUp", {
      UserEmail: value.emailID,
      UserPassword: value.password
    })
    return response;
  }
  const signInHandler = async (value: IAuthenticationContentValue) => {
    const response = await APIService.getData("/authentication/signIn", {
      UserEmail: value.emailID,
      UserPassword: value.password
    })
    return response;
  }
  return { signUpHandler , signInHandler };
};

export default useAuthentication;
