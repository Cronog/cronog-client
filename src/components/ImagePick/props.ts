export default interface Props {
    initialValue?: string;
    colorBorder: string;
    cssClass?: string
    disabled?: boolean
    events: {
        onChange?: (value: string) => void
    }
}