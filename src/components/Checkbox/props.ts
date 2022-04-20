export default interface Props {
	id: string;
	name: string;
	initialValue?: boolean;
	classCss?: string;
	disabled?: boolean;
	textLabel?: string;
	events: {
		onChange?: (value?: string) => void;
	};
}
