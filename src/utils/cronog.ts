import { Cronog } from "../types/Cronog";
import { Response } from "../types/Response";
import { getCredentials } from "./auth";
import { getBackEnd } from "./backend";

export const getCronogById = async (id: string) : Promise<Response<Cronog>> => {
    const response = await getBackEnd<Cronog>("GET", `/cronog/${getCredentials()?.uid}/${id}`)
    return response;
}

export const getCronogByUserId = async () : Promise<Response<Cronog[]>> => {
    const response = await getBackEnd<Cronog[]>("GET", `/cronog/${getCredentials()?.uid}`)
    console.log(response);
    return response;
}

export const saveCronog = async (cronog : Cronog) : Promise<Response<any>> => {
    const response = await getBackEnd("POST", "/cronog", cronog);
    return response;
}

export const updateCronog = async (cronog : Cronog, id : string) : Promise<Response<any>> => {
    const response = await getBackEnd("PUT", `/cronog/${getCredentials()?.uid}/${id}`, cronog);
    return response;
}

export const deleteCronog = async (id : string | undefined) : Promise<Response<any>> => {
    const response = await getBackEnd("DELETE", `/cronog/${getCredentials()?.uid}/${id}`);
    return response;
}