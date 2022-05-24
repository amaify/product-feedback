import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FormInput from "../components/input/input";
import useInput from "../hooks/use-input";
import Button from "../components/button/button";

import ArrowLeft from "../assets/images/shared/icon-arrow-left.svg";

function Login() {
	const navigate = useNavigate();

	let {
		inputBlurHandler: emailBlurHandler,
		inputChangeHandler: emailChangeHandler,
		value: emailValue,
		isValueValid: emailValueIsValid,
		hasError: emailHasError,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	let {
		inputBlurHandler: passwordBlurHandler,
		inputChangeHandler: passwordChangeHandler,
		value: passwordValue,
		hasError: passwordHasError,
		isValueValid: passwordValueIsValid,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	let isValid = false;

	if (emailValueIsValid && passwordValueIsValid) {
		isValid = true;
	}

	const formSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			emailBlurHandler();
			passwordBlurHandler();
			return;
		}

		let formData = {
			email: emailValue,
			password: passwordValue,
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

				<form className="login-contents__form" onSubmit={formSubmitHandler}>
					<h1 className="login-contents__form-heading">Login</h1>
					<FormInput
						control="input"
						labelHtmlFor="email"
						labelName="Email"
						name="email"
						placeholder="john@doe.com"
						type="email"
						inputClassName="login-contents__form-input"
						onChange={emailChangeHandler}
						onBlur={emailBlurHandler}
						value={emailValue}
						inputValueError={emailHasError}
						id="email"
					/>

					<FormInput
						control="input"
						labelHtmlFor="password"
						labelName="Password"
						name="password"
						type="password"
						inputClassName="login-contents__form-input"
						onChange={passwordChangeHandler}
						onBlur={passwordBlurHandler}
						value={passwordValue}
						inputValueError={passwordHasError}
						id="password"
					/>

					<Button btnText="Login" btnNumber="1" />

					<div className="login-contents__form-links">
						<Link to="/register">register</Link>
						<Link to="/forgotpassword">forgot password?</Link>
					</div>
				</form>
			</div>
		</section>
	);
}

export default Login;
