import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

export default interface Props {
    showModal: boolean,
    iconSelected: IconDefinition | undefined,
    colorSelected: string | undefined,
    onSelected: (value: IconDefinition) => void
    closeModal: () => void
}