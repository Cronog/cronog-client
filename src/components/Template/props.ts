import { ReactElement } from "react";

export default interface Props {
    classCssScreen?: string;
    classCssHeader?: string;
    renderHeader?: ReactElement;
    classCssBody?: string;
    renderBody: ReactElement;
    colorMenuHamburguer?: string;
    hideMenuHamburguer?: boolean;
    colorContainer?: string;
    colorHeader?: string;
    colorBody?: string;
    pathBack? : string;
    backAction? : () => void
}