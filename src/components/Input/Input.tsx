import {
	forwardRef,
	ForwardRefRenderFunction,
	KeyboardEvent,
	useState,
} from 'react';

import Props from './props';

import './styles.css';

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
	props,
	ref
): JSX.Element => {
	const [valueLength, setValueLength] = useState<number>(0);

	const {onChange, onFocus, onPressEnter} = props.events;

	function handleChange(value: string): void {
		if (props.maxLength) setValueLength(value.length);

		if (onChange) onChange(value);
	}

	function handleFocus(value: string): void {
		if (onFocus) onFocus(value);
	}

	function handlePressEnter(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			if (onPressEnter) onPressEnter();
		}
	}

	return (
		<div className={`flex flex-col justify-end w-full ${props.styleContainer}`}>
			<input
				id={props.id}
				defaultValue={props.initialValue}
				className={`default-input ${props.style}`}
				type={props.type}
				placeholder={props.placeholder}
				maxLength={props.maxLength}
				minLength={props.minLength}
				disabled={props.disabled}
				onInput={(event) => { 
					if(event.currentTarget.value.length > event.currentTarget.maxLength)
						event.currentTarget.value = event.currentTarget.value.slice(0, event.currentTarget.maxLength)
				}}
				onChange={(event) => handleChange(event.target.value)}
				onFocus={(event) => handleFocus(event.target.value)}
				onKeyDown={handlePressEnter}
				ref={ref}
			/>
			{props.maxLength && (
				<div className="text-right text-sm">
					{`${valueLength}/${props.maxLength}`}
				</div>
			)}
		</div>
	);
};

export default forwardRef(Input);
