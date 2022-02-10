import React from "react";

interface InputPropTypes {
	type?: string;
	control: string;
	name: string;
	labelName: string;
	labelDescription: string;
	id: string;
	labelHtmlFor: string;
}

const FormInput: React.FC<InputPropTypes> = (props: InputPropTypes) => {
	return (
		<>
			{props.control === "textarea" ? (
				<div className="feedbackForm-form__control">
					<label htmlFor={props.labelHtmlFor}>
						<span>{props.labelName}</span>
						<span>{props.labelDescription}</span>
					</label>
					<textarea
						name={props.name}
						cols={30}
						rows={5}
						id={props.id}
					></textarea>
				</div>
			) : (
				<div className="feedbackForm-form__control">
					<label htmlFor={props.labelHtmlFor}>
						<span>{props.labelName}</span>
						<span>{props.labelDescription}</span>
					</label>
					<input type={props.type} name={props.name} id={props.id} />
				</div>
			)}
		</>
	);
};

export default FormInput;
