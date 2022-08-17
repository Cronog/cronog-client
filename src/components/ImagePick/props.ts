export default interface Props {
    initialValue?: string[];
    color: string;
    cssClass?: string;
    disabled?: boolean;
    activateScrollAnimation?: true;
    size?: number;
    events: {
        onChange?: (value: string[]) => void
    }
}