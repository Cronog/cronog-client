import { Cronog } from "../../types/Cronog";

export interface Props {
    cronog: Cronog,
    index: number,
    setCurrentCronog? : (cronog : Cronog) => void,
    move: (from : number, to: number) => void
}