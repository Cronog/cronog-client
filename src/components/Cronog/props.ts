import { Cronog } from "../../types/Cronog";

export interface Props {
    cronog: Cronog,
    index: number,
    move: (from : number, to: number) => void
}