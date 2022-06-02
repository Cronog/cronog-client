import { Cronog } from "../../types/Cronog";

export default interface Props {
    cronogs?: Cronog[] 
    setCronogs?: (cronogs: Cronog[]) => void 
}