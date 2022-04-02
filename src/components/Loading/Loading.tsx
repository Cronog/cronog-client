import {FunctionComponent} from 'react';

import Props from './props';

import './styles.css';

const Loading: FunctionComponent<Props> = (props): JSX.Element => {
	return (
		<div className="container-loading">
			<div
				className="is-loading"
				style={{
					width: `${props.size}px`,
					height: `${props.size}px`,
				}}
			/>
		</div>
	);
};

export default Loading;
