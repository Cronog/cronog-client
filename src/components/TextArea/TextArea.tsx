import {
	forwardRef,
	ForwardRefRenderFunction,
	KeyboardEvent,
	useEffect,
	useState,
} from 'react';

import Props from './props';

import './styles.css';

const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
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
		if (event.key === 'Enter' && onPressEnter) {
			onPressEnter();
		}
	}

	return (
		<div className="flex flex-col justify-end"
			style={{
				"--color-textarea-text": props.colorText || "black",
				"--color-textarea-border": props.colorBorder || "black",
				"--color-textarea-background": props.colorBackground || "transparent",
				opacity: props.disabled ? 0.6 : 1
			} as React.CSSProperties}
		>
			<textarea
				ref={ref}
				id={props.id}
				defaultValue={props.initialValue}
				className={`default-textarea ${props.classCss}`}
				placeholder={props.placeholder}
				maxLength={props.maxLength}
				disabled={props.disabled}
				rows={props.rows || 2}
				onChange={(event) => handleChange(event.target.value)}
				onFocus={(event) => handleFocus(event.target.value)}
				onKeyDown={handlePressEnter}
			/>
			{props.maxLength && (
				<div className="color-textarea-length text-right text-sm">
					{`${valueLength}/${props.maxLength}`}
				</div>
			)}
		</div>
	);
};

export default forwardRef(TextArea);
