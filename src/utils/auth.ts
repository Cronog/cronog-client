import { chamarBackEnd } from "./backend";

import Login from "../types/Login";
import Response from "../types/Response";

export const singIn = async (login : Login) : Promise<Response> => {
    const response = await chamarBackEnd("POST", "/auth/singin", login)

    if(response.success)
        localStorage.setItem("user", JSON.stringify(response.data))

    return response;
}

export const singOut = async (callback: any) => {
    localStorage.removeItem('user');
}

export const recovery = async (email : string) : Promise<Response> => {
    const response = await chamarBackEnd("GET", `/auth/recovery/${email}`)
    return response;
}

export const register = async (login : Login) : Promise<Response> => {
    const response = await chamarBackEnd("POST", "/auth/register", login)
    return response;
}

export const authenticatedUser = (requireAuthentication : boolean) : boolean => {
    
    if(requireAuthentication){
        
       const token = localStorage.getItem("user");

       if(token){
           return true
       }else{
           return false
       }
    }else{
        return true
    }
}