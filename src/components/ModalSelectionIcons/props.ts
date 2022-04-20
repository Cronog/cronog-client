import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

export default interface Props {
    showModal: boolean,
    onSelected: (value: IconDefinition) => void
    closeModal: () => void
}