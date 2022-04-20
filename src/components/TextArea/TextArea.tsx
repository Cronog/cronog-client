import {
	forwardRef,
	ForwardRefRenderFunction,
	KeyboardEvent,
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

	function handleChange(value: string): void {
		if (props.length) setValueLength(value.length);

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
		<div className="flex flex-col justify-end">
			<textarea
				ref={ref}
				id={props.id}
				defaultValue={props.initialValue}
				className={`default-textarea ${props.classCss}`}
				placeholder={props.placeholder}
				maxLength={props.length}
				disabled={props.disabled}
				rows={props.rows || 2}
				onChange={(event) => handleChange(event.target.value)}
				onFocus={(event) => handleFocus(event.target.value)}
				onKeyDown={handlePressEnter}
			/>
			{props.length && (
				<div className="text-right text-sm">
					{`${valueLength}/${props.length}`}
				</div>
			)}
		</div>
	);
};

export default forwardRef(TextArea);
