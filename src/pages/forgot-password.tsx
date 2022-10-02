import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormInput from "../components/input/input";
import useInput from "../hooks/use-input";
import Button from "../components/button/button";
import ArrowLeft from "../assets/images/shared/icon-arrow-left.svg";
import { connect } from "react-redux";
import { RootState } from "../type";
import { forgotPasswordUtil } from "../store/utils/authentication";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface Props {
	error: string;
	authLoading: boolean;
	authMessage: string;
}

function ForgotPassword({ error, authLoading, authMessage }: Props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let {
		inputBlurHandler: emailBlurHandler,
		inputChangeHandler: emailChangeHandler,
		value: emailValue,
		isValueValid: emailValueIsValid,
		hasError: emailHasError,
		resetUserInput,
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

		dispatch(forgotPasswordUtil(formData));
		resetUserInput();
	};

	return (
		<HelmetProvider>
			<section className="login">
				<Helmet>
					<title>Forgot Password - Product Feedback</title>
				</Helmet>
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
						{error !== "" ? <p className="error-message">{error}</p> : ""}
						<h1 className="forgotpassword-contents__form-heading">
							Forgot Password
						</h1>

						{authMessage === "" ? (
							<>
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

								<Button
									btnText={authLoading ? "Submitting..." : "Reset Password"}
									btnNumber="1"
								/>
							</>
						) : (
							<div>
								<p style={{ fontSize: "1.5em", fontWeight: "500" }}>
									{authMessage}
								</p>
								<Link to="/" style={{ fontSize: "1.2em" }}>
									Go Home
								</Link>
							</div>
						)}
					</form>
				</div>
			</section>
		</HelmetProvider>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		error: state.authenticationReducer.error,
		authLoading: state.authenticationReducer.authLoading,
		authMessage: state.authenticationReducer.authMessage,
		actionSuccessful: state.authenticationReducer.registrationSuccess,
	};
};

export default connect(mapStateToProps)(ForgotPassword);
