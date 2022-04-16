import { ReactElement } from "react";

export default interface Props {
    styleScreen?: string;
    styleHeader?: string;
    renderHeader?: ReactElement;
    styleBody?: string;
    renderBody: ReactElement;
    colorMenuHamburguer?: string
}