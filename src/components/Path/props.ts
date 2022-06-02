export default interface Props {
	path: string;
	children: JSX.Element;
	exact?: boolean;
	authenticated?: boolean
}
