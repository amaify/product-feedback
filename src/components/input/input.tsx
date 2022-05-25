import React from "react";

interface InputPropTypes {
	type?: string;
	control: string;
	name: string;
	labelName?: string;
	labelDescription?: string;
	id: string;
	labelHtmlFor?: string;
	placeholder?: string;
	onChange?: (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
	value?: string;
	onBlur?: (
		event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
	maxLength?: number;
	inputClassName: string;
	inputValueError?: boolean;
	textAreaError?: boolean;
}

const FormInput: React.FC<InputPropTypes> = (props: InputPropTypes) => {
	let inputValue;

	props.value === ""
		? (inputValue = "Can't be empty")
		: (inputValue = "Enter at least 5 characters");

	return (
		<>
			{props.control === "textarea" ? (
				<div className={props.inputClassName}>
					{props.labelHtmlFor && props.labelName && props.labelDescription && (
						<label htmlFor={props.labelHtmlFor}>
							<span>{props.labelName}</span>
							<span>{props.labelDescription}</span>
						</label>
					)}
					<textarea
						name={props.name}
						id={props.id}
						value={props.value}
						placeholder={props.placeholder}
						onChange={props.onChange}
						onBlur={props.onBlur}
						maxLength={props.maxLength}
					></textarea>
					{props.textAreaError && <p className="error-text">{inputValue}</p>}
				</div>
			) : (
				<div className={props.inputClassName}>
					<label htmlFor={props.labelHtmlFor}>
						<span>{props.labelName}</span>
						<span>{props.labelDescription}</span>
					</label>
					<input
						type={props.type}
						name={props.name}
						id={props.id}
						onChange={props.onChange}
						onBlur={props.onBlur}
						value={props.value}
						placeholder={props.placeholder}
					/>
					{props.inputValueError && (
						<p className="error-text error-text__input">{inputValue}</p>
					)}
				</div>
			)}
		</>
	);
};

export default FormInput;
