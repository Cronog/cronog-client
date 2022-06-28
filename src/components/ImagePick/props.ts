export default interface Props {
    initialValue?: string;
    color: string;
    cssClass?: string
    disabled?: boolean
    events: {
        onChange?: (value: string) => void
    }
}