import { ReactElement } from "react";

export default interface Props {
    classCssScreen?: string;
    classCssHeader?: string;
    renderHeader?: ReactElement;
    classCssBody?: string;
    renderBody: ReactElement;
    colorMenuHamburguer?: string;
    hideMenuHamburguer?: boolean;
    colorHeader?: string;
    colorBody?: string;
}