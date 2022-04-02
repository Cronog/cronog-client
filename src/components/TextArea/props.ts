export default interface Props {
	id: string;
	name: string;
	initialValue?: string;
	style?: string;
	placeholder?: string;
	disabled?: boolean;
	length?: number;
	rows?: number;
	events: {
		onChange?: (value?: string) => void;
		onFocus?: (value?: string) => void;
		onPressEnter?: () => void;
	};
}
