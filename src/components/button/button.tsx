import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
	btnNumber: string;
	responsive?: string;
	icon?: {};
	btnText: string;
	link?: string;
	onClick?: (e: React.FormEvent) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	return !props.link ? (
		<button
			className={`button button-${props.btnNumber} button-${props.btnNumber}__${props.responsive}`}
			onClick={props.onClick}
		>
			{props.icon && <span className="button-icon">{props.icon}</span>}
			<span>{props.btnText}</span>
		</button>
	) : (
		<Link
			to={props.link}
			className={`button button-${props.btnNumber} button-${props.btnNumber}__${props.responsive}`}
		>
			{props.icon && <span className="button-icon">{props.icon}</span>}
			<span>{props.btnText}</span>
		</Link>
	);
};

export default Button;
