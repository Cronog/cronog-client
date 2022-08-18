export default interface Props {
    color: string | undefined,
    size: number,
    initialValue?: number[],
    disabled?: boolean,
    readOnly?: boolean,
    onChange?: (selectedWeekDays: number[]) => void
}