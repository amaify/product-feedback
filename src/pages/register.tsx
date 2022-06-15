import React from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FormInput from "../components/input/input";
import useInput from "../hooks/use-input";
import Button from "../components/button/button";

import ArrowLeft from "../assets/images/shared/icon-arrow-left.svg";
import { RegisterNewuser } from "../store/utils/authentication";
import { RootState } from "../type";

interface Props {
	authLoading: boolean;
	error: string;
}

function Register({ authLoading, error }: Props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let {
		inputBlurHandler: nameBlurHandler,
		inputChangeHandler: nameChangeHandler,
		value: nameValue,
		isValueValid: nameValueIsValid,
		hasError: nameHasError,
		resetUserInput: resetNameInput,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	let {
		inputBlurHandler: usernameBlurHandler,
		inputChangeHandler: usernmaeChangeHandler,
		value: usernameValue,
		isValueValid: usernameValueIsValid,
		hasError: usernameHasError,
		resetUserInput: resetUsernameInput,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	let {
		inputBlurHandler: emailBlurHandler,
		inputChangeHandler: emailChangeHandler,
		value: emailValue,
		isValueValid: emailValueIsValid,
		hasError: emailHasError,
		resetUserInput: resetEmailInput,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	let {
		inputBlurHandler: passwordBlurHandler,
		inputChangeHandler: passwordChangeHandler,
		value: passwordValue,
		hasError: passwordHasError,
		isValueValid: passwordValueIsValid,
		resetUserInput: resetPasswordInput,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	let isValid = false;

	if (
		emailValueIsValid &&
		passwordValueIsValid &&
		nameValueIsValid &&
		usernameValueIsValid
	) {
		isValid = true;
	}

	const formSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			nameBlurHandler();
			usernameBlurHandler();
			emailBlurHandler();
			passwordBlurHandler();
			return;
		}

		let formData = {
			name: nameValue,
			userName: usernameValue,
			email: emailValue,
			password: passwordValue,
		};

		console.log(formData);
		dispatch(RegisterNewuser(formData, navigate));

		resetNameInput();
		resetUsernameInput();
		resetEmailInput();
		resetPasswordInput();
	};

	return (
		<section className="register">
			<div className="register-contents">
				<p onClick={() => navigate(-1)}>
					<span>
						<img src={ArrowLeft} alt="Arrow facing left" />
					</span>
					<span>go back</span>
				</p>

				<form className="register-contents__form" onSubmit={formSubmitHandler}>
					{error !== "" ? <p className="error-message">{error}</p> : ""}
					<h1 className="register-contents__form-heading">Register New User</h1>
					<FormInput
						control="input"
						labelHtmlFor="name"
						labelName="Name"
						name="name"
						placeholder="John Doe"
						type="text"
						inputClassName="register-contents__form-input"
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
						value={nameValue}
						inputValueError={nameHasError}
						id="name"
					/>

					<FormInput
						control="input"
						labelHtmlFor="username"
						labelName="Username"
						name="username"
						placeholder="john.doe"
						type="text"
						inputClassName="register-contents__form-input"
						onChange={usernmaeChangeHandler}
						onBlur={usernameBlurHandler}
						value={usernameValue}
						inputValueError={usernameHasError}
						id="username"
					/>

					<FormInput
						control="input"
						labelHtmlFor="email"
						labelName="Email"
						name="email"
						placeholder="email@example.com"
						type="email"
						inputClassName="register-contents__form-input"
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
						inputClassName="register-contents__form-input"
						onChange={passwordChangeHandler}
						onBlur={passwordBlurHandler}
						value={passwordValue}
						inputValueError={passwordHasError}
						id="password"
					/>

					<Button
						btnText={authLoading ? "Registering..." : "Register"}
						btnNumber="1"
					/>

					<div className="register-contents__form-links">
						<p id="register-links">
							<span>Already have an account?</span>
							<span>
								<Link to="/login">login</Link>
							</span>
						</p>
					</div>
				</form>
			</div>
		</section>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		authLoading: state.authenticationReducer.authLoading,
		error: state.authenticationReducer.error,
	};
};

export default connect(mapStateToProps)(Register);
