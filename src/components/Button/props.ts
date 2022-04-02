export default interface Props {
	type?: 'button' | 'submit' | 'reset' | undefined;
	style: string;
	children: string | JSX.Element;
	action: () => {} | void;
}
