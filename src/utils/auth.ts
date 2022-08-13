import { getBackEnd } from "./backend";

import Login from "../types/Login";
import Response from "../types/Response";
import { Credentials } from "../types/Credentials";
import dayjs from "dayjs";

export const singIn = async (login : Login) : Promise<Response> => {
    const response = await getBackEnd("POST", "/auth/singin", login)

    if(response.success)
        saveCredentials(response.data)

    return response;
}

export const singOut = async (callback?: void) => {
    localStorage.removeItem('user');
    window.location.pathname = "/auth/login"
}

export const recovery = async (email : string) : Promise<Response> => {
    const response = await getBackEnd("GET", `/auth/recovery/${email}`)
    return response;
}

export const register = async (login : Login) : Promise<Response> => {
    const response = await getBackEnd("POST", "/auth/register", login)
    return response;
}

export const authenticatedUser = async (requireAuthentication : boolean) : Promise<boolean> => {
    if(requireAuthentication){
        if(requireAuthentication){
            return getBackEnd("GET", "/auth/authenticatedUser")
            .then(data => data.success);
         }else{
             return true;
         }
    }else{
        return true
    }
}

export const getCredentials = () : Credentials | undefined  => {
    const credentials = localStorage.getItem("user")
    
    if(!credentials) return undefined;
    
    return JSON.parse(credentials) as Credentials;
}

const saveCredentials = (credentials: any) => {
    localStorage.setItem("user", JSON.stringify({
        accessToken: credentials.access_token || credentials.stsTokenManager.accessToken,
        refreshToken: credentials.refresh_token || credentials.stsTokenManager.refreshToken,
        uid: credentials.user_id || credentials.uid,
        email: getCredentials()?.email || credentials.email,
        updateAt: dayjs()
    } as Credentials));
}

export const renewAccessToken = async () : Promise<Response> => {
    const response = await getBackEnd("GET", `/auth/refresh/${getCredentials()?.refreshToken}`)
    if(response.success)
        saveCredentials(response.data)
    return response;
}