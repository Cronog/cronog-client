import {forwardRef, ForwardRefRenderFunction} from 'react';

import Props from './props';

import './styles.css';

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, Props> = (
	props,
	ref
) => {
	const {onChange} = props.events;

	function handleChange(value: string): void {
		if (onChange) onChange(value);
	}

	return (
		<div className="flex flex-col justify-center w-full">
			{props.textLabel && (
				<label className="text-center">{props.textLabel}</label>
			)}
			<input
				type="checkbox"
				id={props.id}
				defaultChecked={props.initialValue}
				className={`w-full ${props.style}`}
				disabled={props.disabled}
				onChange={(event) => handleChange(event.target.value)}
				ref={ref}
			/>
		</div>
	);
};

export default forwardRef(Checkbox);
