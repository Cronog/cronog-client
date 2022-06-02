import { PreviewMode } from "../../types/PreviewMode"

export default interface Props {
    showModal: boolean,
    onSelected: (value: PreviewMode) => void
    color: string,
    closeModal: () => void
}