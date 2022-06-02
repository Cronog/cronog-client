import Props from './props';

import './styles.css';

const Button = (props : Props) => {
	return (
		<button
			type={props.type ?? 'button'}
			className={`default-btn ${props.classCss}`}
			style={{
				backgroundColor: props.backgroundColor,
				borderColor: props.borderColor || props.backgroundColor,
				color: props.textColor || "white"
			}}
			onClick={props.action}>
			{props.children}
		</button>
	);
};

export default Button;
