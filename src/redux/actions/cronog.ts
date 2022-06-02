import { Cronog } from "../../types/Cronog";

export function setCurrentCronog(cronog : Cronog) {
    localStorage.setItem('currentCronog', JSON.stringify(cronog))
    return {
      type: "SET_CURRENT_CRONOG",
      currentCronog : cronog,
    };
  }

  export function setCronogs(cronogs : Cronog[]) {
    return {
      type: "SET_CRONOGS",
      cronogs : cronogs,
    };
  }