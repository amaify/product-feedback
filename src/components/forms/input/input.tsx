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
	defaultValue?: string;
	onBlur?: (
		event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
	) => void;
	maxLength?: number;
}

const FormInput: React.FC<InputPropTypes> = (props: InputPropTypes) => {
	return (
		<>
			{props.control === "textarea" ? (
				<div className="feedbackForm-form__control">
					{props.labelHtmlFor && props.labelName && props.labelDescription && (
						<label htmlFor={props.labelHtmlFor}>
							<span>{props.labelName}</span>
							<span>{props.labelDescription}</span>
						</label>
					)}
					<textarea
						name={props.name}
						// cols={30}
						// rows={5}
						id={props.id}
						defaultValue={props.defaultValue}
						placeholder={props.placeholder}
						onChange={props.onChange}
						onBlur={props.onBlur}
						maxLength={props.maxLength}
					></textarea>
				</div>
			) : (
				<div className="feedbackForm-form__control">
					<label htmlFor={props.labelHtmlFor}>
						<span>{props.labelName}</span>
						<span>{props.labelDescription}</span>
					</label>
					<input
						type={props.type}
						name={props.name}
						id={props.id}
						onChange={props.onChange}
						defaultValue={props.defaultValue}
					/>
				</div>
			)}
		</>
	);
};

export default FormInput;
