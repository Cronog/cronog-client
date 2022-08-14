export default interface Props {
    showModal: boolean,
    closeModal: () => void,
    type: "task" | "cronog",
    actionConfirm: () => void
    actionDecline: () => void
    color?: string
}