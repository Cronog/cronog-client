import { Response } from "../types/Response";
import { getBackEnd } from "./backend";
import { Color } from "../types/Color";
import { hexToRgb } from "./general";

export const getColors = async () : Promise<Response<Color[]>> => {
    const response = await getBackEnd<Color[]>("GET", "/color")
    return response;
}

export const setBetterContrast = (hexColor: string): string => {
    //avaliar usar lib color, funcionalidade: isLight ou isDark 
    const rgb = hexToRgb(hexColor);
    return rgb ? rgb.red + rgb.green + rgb.blue > 255 ? "black" : "white" : "black"
}