import { showToast } from "../components/Toast/Toast";
import { RequestType } from "../types/RequestType";
import Response from "../types/Response";
import { getCredentials, renewAccessToken, singOut } from "./auth";

const linkBackEnd = process.env.REACT_APP_API_ENVIRONMENT ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL;

export async function getBackEnd<T = {}>(method : string, path : string, body? : any, contentType: RequestType = RequestType.json) : Promise<Response<T>> {

    let headers;

    if(contentType == RequestType.formData)
        headers = { "token-auth" : getCredentials()?.accessToken || "" }
    else
        headers = { 
            "content-type": "application/json",
            "token-auth" : getCredentials()?.accessToken || ""
        }

    const response = await fetch(linkBackEnd + path, {
        method: method,
        headers: headers,
        body: contentType == RequestType.formData ? body : JSON.stringify(body),
        })

    const data = await response.json()

    if(data.status == 401){
        await renewAccessToken();
        return await getBackEnd(method, path, body, contentType);
    }
    
    return resolveResponse(data)
  };

function resolveResponse<T = {}>(response : Response<T>) : Response<T> {
    switch(response.status){
        case 403:
            singOut()
            break;
    }
    return response
  } 