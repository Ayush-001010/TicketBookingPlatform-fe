import { MessageInstance } from "antd/es/message/interface";
import APIService from "../Service/APIServices/APIService";
import CommonConfig from "../Service/Config/CommonConfig";

const useAuthentication = (messageAPI: MessageInstance) => {
  const signIn = async (value: Record<string, string>): Promise<any> => {
    const { UserName, UserPassword } = value;
    if (!UserName || !UserPassword) {
      messageAPI.error("Please fill all the fields");
      return {success : false};
    }
    if (UserName.length < 3) {
      messageAPI.error("Username must be at least 3 characters long");
      return {success : false};
    }
    if (UserPassword.length < 6) {
      messageAPI.error("Password must be at least 6 characters long");
      return {success : false};
    }
    messageAPI.loading(CommonConfig.loadingMessageAPI);
    const respose = await APIService.getData("/authentication/signIn", value);
    messageAPI.destroy();
    if (respose.success) {
      messageAPI.success({
        content: "User Logged In Successfully",
        duration: 2,
      });
      return {success: true, data: respose.data};
    } else {
      messageAPI.error(CommonConfig.errorMessageAPI);
      return {success: false};
    }
  };

  const authenticateUser = async (
    value: Record<string, string>
  ): Promise<Boolean> => {
    const { UserName, UserPassword, UserEmail } = value;
    if (!UserName || !UserPassword || !UserEmail) {
      messageAPI.error("Please fill all the fields");
      return false;
    }
    if (UserName.length < 3) {
      messageAPI.error("Username must be at least 3 characters long");
      return false;
    }
    if (!UserEmail.includes("@")) {
      messageAPI.error("Please enter a valid email address");
      return false;
    }
    if (UserPassword.length < 6) {
      messageAPI.error("Password must be at least 6 characters long");
      return false;
    }
    messageAPI.loading(CommonConfig.loadingMessageAPI);
    const respose = await APIService.getData("/authentication/signUp", value);
    messageAPI.destroy();
    if (respose.success) {
      messageAPI.success({ content: "User Created Successfully", duration: 2 });
      return true;
    } else {
      messageAPI.error(CommonConfig.errorMessageAPI);
      return false;
    }
  };
  return { authenticateUser , signIn };
};

export default useAuthentication;
