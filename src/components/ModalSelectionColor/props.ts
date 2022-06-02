import { PreviewMode } from "../../types/PreviewMode"

export default interface Props {
    showModal: boolean,
    onSelected: (color: string) => void
    closeModal: () => void
}