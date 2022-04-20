import {forwardRef, ForwardRefRenderFunction} from 'react';

import Props from './props';

import './styles.css';

const Select: ForwardRefRenderFunction<HTMLSelectElement, Props> = (
	props,
	ref
): JSX.Element => {
	const {onChange, onFocus} = props.events;

	function handleChange(value: string): void {
		if (onChange) onChange(value);
	}

	function handleFocus(value: string): void {
		if (onFocus) onFocus(value);
	}

	return (
		<select
			ref={ref}
			id={props.id}
			name={props.name}
			defaultValue={props.initialValue}
			className={`default-select ${props.classCss}`}
			disabled={props.disabled}
			
			onChange={(event) => handleChange(event.target.value)}
			onFocus={(event) => handleFocus(event.target.value)}>
			{props.options.map((opt) => {
				return (
				<option selected={opt.value == props.initialValue ? true : false} key={opt.value} value={opt.value}>
					{opt.text}
				</option>
				)
				})}
		</select>
	);
};

export default forwardRef(Select);
