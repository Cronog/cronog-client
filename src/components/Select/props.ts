export default interface Props {
	id: string;
	name: string;
	initialValue: string | number | undefined;
	classCss?: string;
	colorText?: string;
	colorBorder?: string;
	disabled?: boolean;
	events: {
		onChange?: (value?: string | number) => void;
		onFocus?: (value?: string | number) => void;
	};
	options: Array<{
		text: string;
		value: string | number;
	}>;
}
