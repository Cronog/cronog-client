import { chamarBackEnd } from "./backend";

import Login from "../types/Login";
import Response from "../types/Response";

export const singIn = async (login : Login) : Promise<Response> => {
    const response = await chamarBackEnd("POST", "/auth/singin", login)

    if(response.success)
        localStorage.setItem("user", JSON.stringify(response.data["user"]))

    return response;
}

export const singOut = async (login : Login) => {

}

export const register = async (login : Login) => {
}

export const authenticatedUser = (requireAuthentication : boolean) : boolean => {
    
    if(requireAuthentication){
       const token = sessionStorage.getItem('user');

       if(token){
           return true
       }else{
           return false
       }
    }else{
        return true
    }
}