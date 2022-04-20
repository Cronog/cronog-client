import { Cronog } from "../types/Cronog";
import Response from "../types/Response";
import { getCredentials, singOut } from "./auth";

const linkBackEnd = process.env.REACT_APP_API_URL;

export async function chamarBackEnd<T = {}>(metodo : string, caminho : string, corpo? : any) : Promise<Response<T>> {

    const cabecalho = {
        "Content-Type": "application/json",
        "tokenAuth" : getCredentials()?.stsTokenManager.accessToken || ""
        }

    if(corpo){
        const response = await fetch(linkBackEnd + caminho, {
            method: metodo,
            headers: cabecalho,
            body: JSON.stringify(corpo),
            })
        return resolveResponse(await response.json())   
    }else{
        const response = await fetch(linkBackEnd + caminho, {
            method: metodo,
            headers: cabecalho,
            })
        return resolveResponse(await response.json())
        }
  };

  function resolveResponse<T>(response : Response<T>) : Response<T> {
      if(response.status === 509){
          singOut()
      }

      return response
  } 