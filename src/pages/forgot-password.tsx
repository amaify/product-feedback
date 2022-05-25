import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FormInput from "../components/input/input";
import useInput from "../hooks/use-input";
import Button from "../components/button/button";

import ArrowLeft from "../assets/images/shared/icon-arrow-left.svg";

function ForgotPassword() {
	const navigate = useNavigate();

	let {
		inputBlurHandler: emailBlurHandler,
		inputChangeHandler: emailChangeHandler,
		value: emailValue,
		isValueValid: emailValueIsValid,
		hasError: emailHasError,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	let isValid = false;

	if (emailValueIsValid) {
		isValid = true;
	}

	const formSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			emailBlurHandler();
			return;
		}

		let formData = {
			email: emailValue,
		};

		console.log(formData);
	};

	return (
		<section className="login">
			<div className="login-contents">
				<p onClick={() => navigate(-1)}>
					<span>
						<img src={ArrowLeft} alt="Arrow facing left" />
					</span>
					<span>go back</span>
				</p>

				<form
					className="forgotpassword-contents__form"
					onSubmit={formSubmitHandler}
				>
					<h1 className="forgotpassword-contents__form-heading">
						Forgot Password
					</h1>

					<FormInput
						control="input"
						labelHtmlFor="email"
						labelName="Email"
						name="email"
						placeholder="email@example.com"
						type="email"
						inputClassName="forgotpassword-contents__form-input"
						onChange={emailChangeHandler}
						onBlur={emailBlurHandler}
						value={emailValue}
						inputValueError={emailHasError}
						id="email"
					/>

					<Button btnText="Reset Password" btnNumber="1" />
				</form>
			</div>
		</section>
	);
}

export default ForgotPassword;
