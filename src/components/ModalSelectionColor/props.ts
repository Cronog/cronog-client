import { PreviewMode } from "../../types/PreviewMode"

export default interface Props {
    showModal: boolean,
    colorSelected: string | undefined,
    onSelected: (color: string) => void
    closeModal: () => void
}