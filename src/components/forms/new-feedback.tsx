import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import InputSelect from "./input/select";
import FormInput from "./input/input";

import LeftArrow from "../../assets/images/shared/icon-arrow-left.svg";
import ArrowDown from "../../assets/images/shared/icon-arrow-down.svg";
import NewFeedbackIcon from "../../assets/images/shared/icon-new-feedback.svg";

function NewFeedbackForm() {
	const navigate = useNavigate();

	return (
		<section className="feedbackForm">
			<div className="feedbackForm-content">
				<p className="feedbackForm-content__link" onClick={() => navigate("/")}>
					<span>
						<img src={LeftArrow} alt="Arrow Pointing Left" />
					</span>
					<span>go back</span>
				</p>

				<form className="feedbackForm-form">
					<div className="feedbackForm-form__icon">
						<img src={NewFeedbackIcon} alt="Suggestion Icon" />
					</div>
					<h2 className="feedbackForm-form__heading">create new feedback</h2>

					<FormInput
						labelHtmlFor="title"
						labelName="feedback title"
						labelDescription="Add a short, descriptive headling"
						type="text"
						name="title"
						id="title"
						control="input"
					/>

					<InputSelect
						labelHtmlFor="category"
						labelTitle="category"
						labelDescription="Choose a category for your feedback"
					/>

					<FormInput
						control="textarea"
						labelHtmlFor="details"
						labelName="feedback detail"
						labelDescription="Include any specific comments on what should be improved, added, etc."
						name="detailDescription"
						id="details"
					/>

					<div className="feedbackForm-form__btns">
						<Button btnText="Cancel" btnNumber="3" />
						<Button btnText="Add Feedback" btnNumber="1" />
					</div>
				</form>
			</div>
		</section>
	);
}

export default NewFeedbackForm;
