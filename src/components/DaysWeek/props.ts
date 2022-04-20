export default interface Props {
    color: string | undefined,
    size: number,
    initialValue?: number[],
    disabled?: boolean,
    onChange?: (selectedWeekDays: number[]) => void
}