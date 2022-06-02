export default interface Props {
	id: string;
	type: string;
	name: string;
	initialValue?: string;
	classCss?: string;
	classCssContainer?: string;
	placeholder?: string;
	disabled?: boolean;
	colorText?: string;
	colorBorder?: string;
	maxLength?: number;
	minLength?: number;
	events: {
		onChange?: (value?: string) => void;
		onFocus?: (value?: string) => void;
		onPressEnter?: () => void;
	};
}
