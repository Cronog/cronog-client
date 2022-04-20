export default interface Props {
	type?: 'button' | 'submit' | 'reset' | undefined;
	classCss: string;
	children: string | JSX.Element;
	action: () => {} | void;
}
