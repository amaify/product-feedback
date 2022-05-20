import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import InputSelect from "./input/select";
import EditInputSelect from "./input/edit-select";
// import FormInput from "./input/input";
import FormInput from "../input/input";

import useInput from "../../hooks/use-input";

import LeftArrow from "../../assets/images/shared/icon-arrow-left.svg";
import ArrowDown from "../../assets/images/shared/icon-arrow-down.svg";
import NewFeedbackIcon from "../../assets/images/shared/icon-new-feedback.svg";
import EditFeedbackIcon from "../../assets/images/shared/icon-edit-feedback.svg";

function NewFeedbackForm() {
	const navigate = useNavigate();

	let {
		hasError: titleHasError,
		category,
		updateStatus,
		inputBlurHandler: titleBlurHanlder,
		inputChangeHandler: titleChangeHandler,
		isValueValid: titleIsValid,
		onSelectItemHandler,
		activeClick,
		activeText,
		activeTextEdit,
		editSelectItemHandler,
		resetUserInput: resetTitleInput,
		value: titleValue,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	let {
		hasError: detailsDescriptionHasError,
		inputBlurHandler: detailDescriptionBlurHanlder,
		inputChangeHandler: detailDescriptionChangeHandler,
		isValueValid: detailDescriptionIsValid,
		resetUserInput: resetDetailDescriptionInput,
		value: detailDescriptionValue,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	const [editForm, setEditForm] = useState(true);

	let isValid = false;

	if (titleIsValid && detailDescriptionIsValid) {
		isValid = true;
	}

	const titleClass = titleHasError
		? "feedbackForm-form__control feedbackForm-form__control--invalid"
		: "feedbackForm-form__control";
	const descriptionClass = detailsDescriptionHasError
		? "feedbackForm-form__control feedbackForm-form__control--invalid"
		: "feedbackForm-form__control";

	const submitFormHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			titleBlurHanlder();
			detailDescriptionBlurHanlder();
			return;
		}

		let formData;

		if (!editForm) {
			formData = {
				title: titleValue,
				detailDescription: detailDescriptionValue,
				category: category,
			};
		} else {
			formData = {
				title: titleValue,
				detailDescription: detailDescriptionValue,
				category: category,
				updateStatus: editForm ? updateStatus : "",
			};
		}

		console.log(formData);
		resetTitleInput();
		resetDetailDescriptionInput();
	};

	return (
		<section className="feedbackForm">
			<div className="feedbackForm-content">
				<p className="feedbackForm-content__link" onClick={() => navigate(-1)}>
					<span>
						<img src={LeftArrow} alt="Arrow Pointing Left" />
					</span>
					<span>go back</span>
				</p>

				<form className="feedbackForm-form" onSubmit={submitFormHandler}>
					<div className="feedbackForm-form__icon">
						{!editForm ? (
							<img src={NewFeedbackIcon} alt="New feedback display" />
						) : (
							<img src={EditFeedbackIcon} alt="Edit feedback display" />
						)}
					</div>
					<h2 className="feedbackForm-form__heading">
						{!editForm
							? "create new feedback"
							: `Editing 'Add a dark theme option'`}
					</h2>

					<FormInput
						labelHtmlFor="title"
						labelName="feedback title"
						labelDescription="Add a short, descriptive headling"
						type="text"
						name="title"
						id="title"
						control="input"
						onChange={titleChangeHandler}
						onBlur={titleBlurHanlder}
						value={titleValue}
						inputClassName={titleClass}
						inputValueError={titleHasError}
					/>

					<InputSelect
						labelHtmlFor="category"
						labelTitle="category"
						labelDescription="Choose a category for your feedback"
						activeText={activeText}
						activeClick={activeClick}
						onSelectItemHandler={onSelectItemHandler}
					/>

					{editForm && (
						<EditInputSelect
							labelHtmlFor="updateStatus"
							labelTitle="update status"
							labelDescription="Change feedback state"
							activeText={activeTextEdit}
							activeClick={activeClick}
							onSelectItemHandler={editSelectItemHandler}
						/>
					)}

					<FormInput
						control="textarea"
						labelHtmlFor="details"
						labelName="feedback detail"
						labelDescription="Include any specific comments on what should be improved, added, etc."
						name="detailDescription"
						id="details"
						onChange={detailDescriptionChangeHandler}
						onBlur={detailDescriptionBlurHanlder}
						value={detailDescriptionValue}
						inputClassName={descriptionClass}
						textAreaError={detailsDescriptionHasError}
					/>

					<div className="feedbackForm-form__btns">
						{editForm && (
							<div className="feedbackForm-form__btns--delete">
								<Button btnText="Delete" btnNumber="4" />
							</div>
						)}
						<div className="feedbackForm-form__btns--actions">
							<Button btnText="Cancel" btnNumber="3" />
							<Button btnText="Add Feedback" btnNumber="1" />
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}

export default NewFeedbackForm;
