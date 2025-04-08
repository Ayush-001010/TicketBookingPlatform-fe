import { IForm } from "../Interface/CommonInterface";

export default class AuthenticationConfig {
    static signInFields : Array<IForm> = [
        {
            displayName: "User Name",
            backendName: "UserName",
            type: "text",
        },
        {
            displayName: "Password",
            backendName: "UserPassword",
            type: "password",
        }
    ]
    static signUpFields : Array<IForm> = [
        {
            displayName: "User Name",
            backendName: "UserName",
            type: "text",
        },
        {
            displayName: "Password",
            backendName: "UserPassword",
            type: "password",
        },
        {
            displayName: "Email",
            backendName: "UserEmail",
            type: "email",
        }
    ]
}