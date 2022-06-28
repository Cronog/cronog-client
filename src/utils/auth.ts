import { getBackEnd } from "./backend";

import Login from "../types/Login";
import Response from "../types/Response";
import { Credentials } from "../types/Credentials";

export const singIn = async (login : Login) : Promise<Response> => {
    const response = await getBackEnd("POST", "/auth/singin", login)

    if(response.success)
        localStorage.setItem("user", JSON.stringify(response.data))

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