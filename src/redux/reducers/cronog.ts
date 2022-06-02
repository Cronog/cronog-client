import { Cronog } from "../../types/Cronog";

const ESTADO_INICIAL = {
    currentCronog: JSON.parse(localStorage.getItem('currentCronog') || "{}") || {} as Cronog,
    cronogs: [] as Cronog[]
  };
  
  export default function CronogReducer(state = ESTADO_INICIAL, action: any) : any {
    switch (action.type) {
        case "SET_CURRENT_CRONOG":
          return {
            ...state,
            currentCronog: action.currentCronog,
          };
        case "SET_CRONOGS":
          return {
            ...state,
            cronogs: action.cronogs,
          };
        default:
        return {
            ...state
        }
    }
}