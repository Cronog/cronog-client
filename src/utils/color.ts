import { Response } from "../types/Response";
import { chamarBackEnd } from "./backend";
import { Color } from "../types/Color";

export const getColors = async () : Promise<Response<Color[]>> => {
    const response = await chamarBackEnd<Color[]>("GET", "/color")
    return response;
}