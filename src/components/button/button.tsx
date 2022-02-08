import React from "react";

interface ButtonProps {
	btnNumber: string;
	responsive?: string;
	icon?: {};
	btnText: string;
}

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button
			className={`button button-${props.btnNumber} button-${props.btnNumber}__${props.responsive}`}
		>
			{props.icon && <span className="button-icon">{props.icon}</span>}
			<span>{props.btnText}</span>
		</button>
	);
};

export default Button;
