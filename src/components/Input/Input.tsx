import {
	forwardRef,
	ForwardRefRenderFunction,
	KeyboardEvent,
	useEffect,
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

	useEffect(() => {
		if(props.initialValue) setValueLength(props.initialValue.length)
	}, [props.initialValue]);

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
		<div className={`flex flex-col justify-end w-full ${props.classCssContainer}`}
		style={{
			"--color-input-text": props.colorText || "black",
			"--color-input-border": props.colorBorder || "black",
			opacity: props.disabled ? 0.6 : 1
        } as React.CSSProperties}>
			<input
				id={props.id}
				defaultValue={props.initialValue}
				className={`default-input ${props.type === "color" ? "!hidden" : ""} ${props.classCss}`}
				type={props.type}
				placeholder={props.placeholder}
				maxLength={props.maxLength || 9999}
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
			{props.type === "color" && (
				<label 
				className={`default-input ${props.classCss}`}
				style={{
					backgroundColor: props.initialValue
				}} 
				htmlFor={props.id}></label>
				)}
			{props.maxLength && (
				<div className="color-input-length text-right text-sm">
					{`${valueLength}/${props.maxLength}`}
				</div>
			)}
		</div>
	);
};

export default forwardRef(Input);
