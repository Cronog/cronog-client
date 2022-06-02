export default interface Props {
	type?: 'button' | 'submit' | 'reset' | undefined;
	classCss?: string;
	backgroundColor?: string,
	textColor?: string,
	borderColor?: string,
	children: string | JSX.Element;
	action: () => {} | void;
}
