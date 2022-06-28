import { showToast } from "../components/Toast/Toast";
import { RequestType } from "../types/RequestType";
import Response from "../types/Response";
import { getCredentials, singOut } from "./auth";

const linkBackEnd = process.env.REACT_APP_API_URL_DEV || process.env.REACT_APP_API_URL;

export async function getBackEnd<T = {}>(method : string, path : string, body? : any, contentType: RequestType = 0) : Promise<Response<T>> {

    let headers;

    if(contentType == 1){
        headers = {
            "tokenAuth" : getCredentials()?.stsTokenManager.accessToken || ""
            }
        }else{
        headers = {
            "Content-Type": "application/json",
            "tokenAuth" : getCredentials()?.stsTokenManager.accessToken || ""
            }
        }

    // try {
        if(body){
            const response = await fetch(linkBackEnd + path, {
                method: method,
                headers: headers,
                body: contentType == 1 ? body : JSON.stringify(body),
                })
            return resolveResponse(await response.json())
    
        }else{
            const response = await fetch(linkBackEnd + path, {
                method: method,
                headers: headers,
                })
            return resolveResponse(await response.json())
            }
        // } catch (error) {
        //     if(error == "TypeError: Failed to fetch"){
        //         return resolveResponse({
        //             status: 510,
        //             message: "Erro inesperado",
        //             success: false,
        //             data: error
        //         } as Response<T>)
        //     }else{
        //         return resolveResponse({
        //             status: 511,
        //             message: "Erro não tratado",
        //             success: false,
        //             data: error
        //         } as Response<T>)
        //     }
        // }
  };

  function resolveResponse<T = {}>(response : Response<T>) : Response<T> {
      switch(response.status){
        case 509:
            singOut()
            break;
        case 510:
            showToast("error", response.message);
            break;
      }
      return response
  } 