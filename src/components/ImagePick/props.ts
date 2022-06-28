export default interface Props {
    initialValue?: string[];
    color: string;
    cssClass?: string;
    disabled?: boolean;
    size?: number;
    events: {
        onChange?: (value: string[]) => void
    }
}