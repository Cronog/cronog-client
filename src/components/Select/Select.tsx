import {forwardRef, ForwardRefRenderFunction} from 'react';

import Props from './props';

import './styles.css';

const Select: ForwardRefRenderFunction<HTMLSelectElement, Props> = (
	props,
	ref
) => {
	const {onChange, onFocus} = props.events;

	function handleChange(value: string): void {
		if (onChange) onChange(value);
	}

	function handleFocus(value: string): void {
		if (onFocus) onFocus(value);
	}

	console.log(props.initialValue)
	
	return (
		<select
			style={{
				"--color-select-text": props.colorText || "black",
				"--color-select-border": props.colorBorder || "black",
				opacity: props.disabled ? 0.6 : 1
			} as React.CSSProperties}
			ref={ref}
			id={props.id}
			name={props.name}
			defaultValue={props.initialValue}
			className={`default-select border-opacity-20 ${props.classCss}`}
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
