export default interface Props {
	id: string;
	type: string;
	name: string;
	initialValue?: string;
	style?: string;
	styleContainer?: string;
	placeholder?: string;
	disabled?: boolean;
	maxLength?: number;
	minLength?: number;
	events: {
		onChange?: (value?: string) => void;
		onFocus?: (value?: string) => void;
		onPressEnter?: () => void;
	};
}
