import { Response } from "../types/Response";
import { getBackEnd } from "./backend";
import { Color } from "../types/Color";

export const getColors = async () : Promise<Response<Color[]>> => {
    const response = await getBackEnd<Color[]>("GET", "/color")
    return response;
}