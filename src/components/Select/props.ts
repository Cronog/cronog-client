export default interface Props {
	id: string;
	type: string;
	name: string;
	initialValue: string;
	classCss?: string;
	disabled?: boolean;
	events: {
		onChange?: (value?: string) => void;
		onFocus?: (value?: string) => void;
	};
	options: Array<{
		text: string;
		value: string;
	}>;
}
