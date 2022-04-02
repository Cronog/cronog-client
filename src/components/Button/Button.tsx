import {FunctionComponent} from 'react';
import Props from './props';

import './styles.css';

const Button: FunctionComponent<Props> = (props): JSX.Element => {
	return (
		<button
			type={props.type ?? 'button'}
			className={`default-btn ${props.style}`}
			onClick={props.action}>
			{props.children}
		</button>
	);
};

export default Button;
