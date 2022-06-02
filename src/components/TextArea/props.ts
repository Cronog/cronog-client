export default interface Props {
	id: string;
	name: string;
	initialValue?: string;
	classCss?: string;
	colorText?: string;
	colorBorder?: string;
	colorBackground?: string;
	placeholder?: string;
	disabled?: boolean;
	maxLength?: number;
	rows?: number;
	events: {
		onChange?: (value?: string) => void;
		onFocus?: (value?: string) => void;
		onPressEnter?: () => void;
	};
}
