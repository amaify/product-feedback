import React, { useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import InputSelect from "./input/select";
import EditInputSelect from "./input/edit-select";
// import FormInput from "./input/input";
import FormInput from "../input/input";
import Modal from "../modal/modal";
import Backdrop from "../backdrop/backdrop";

import useInput from "../../hooks/use-input";

import LeftArrow from "../../assets/images/shared/icon-arrow-left.svg";
import ArrowDown from "../../assets/images/shared/icon-arrow-down.svg";
import NewFeedbackIcon from "../../assets/images/shared/icon-new-feedback.svg";
import EditFeedbackIcon from "../../assets/images/shared/icon-edit-feedback.svg";
import {
	addNewProductFeedback,
	editProductFeedback,
} from "../../store/utils/feedbackUtil";
import { FeedbackProps, RootState } from "../../type";
import { getFeedbackToDelete } from "../../store/actions/creators/product-feedback";

interface ReduxState {
	userToken: string;
	editState: boolean;
	editContent: FeedbackProps;
	feedbackToDelete: boolean;
}

function NewFeedbackForm({
	userToken,
	editState,
	editContent,
	feedbackToDelete,
}: ReduxState) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let {
		hasError: titleHasError,
		category,
		updateStatus,
		inputBlurHandler: titleBlurHanlder,
		inputChangeHandler: titleChangeHandler,
		isValueValid: titleIsValid,
		onSelectItemHandler,
		activeClick,
		editActiveClick,
		activeText,
		activeTextEdit,
		editSelectItemHandler,
		resetUserInput: resetTitleInput,
		value: titleValue,
		editValue: editTitleValue,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

	let {
		hasError: detailsDescriptionHasError,
		inputBlurHandler: detailDescriptionBlurHanlder,
		inputChangeHandler: detailDescriptionChangeHandler,
		isValueValid: detailDescriptionIsValid,
		resetUserInput: resetDetailDescriptionInput,
		value: detailDescriptionValue,
		editDescription: editDescriptionValue,
	} = useInput((value: string) => value.trim() !== "" && value.length >= 5);

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

		if (!editState) {
			formData = {
				title: titleValue,
				description: detailDescriptionValue,
				category: activeText,
			};

			dispatch(addNewProductFeedback(formData, navigate, userToken));
			resetTitleInput();
			resetDetailDescriptionInput();
		} else {
			formData = {
				title: editTitleValue,
				description: editDescriptionValue,
				category: activeText,
				updateStatus: activeTextEdit,
			};

			// dispatch(addNewProductFeedback(formData, navigate, userToken));
			dispatch(
				editProductFeedback(formData, navigate, userToken, editContent._id)
			);
		}

		console.log(formData);
		// dispatch(addNewProductFeedback(formData, navigate, userToken));
		// resetTitleInput();
		// resetDetailDescriptionInput();
	};

	const cancelEditHandler = (event: React.FormEvent) => {
		event.preventDefault();
		console.log("cancel clicked");
	};

	const deleteFeedbackHandler = (event: React.FormEvent) => {
		event.preventDefault();

		dispatch(getFeedbackToDelete());
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
						{!editState ? (
							<img src={NewFeedbackIcon} alt="New feedback display" />
						) : (
							<img src={EditFeedbackIcon} alt="Edit feedback display" />
						)}
					</div>
					<h2 className="feedbackForm-form__heading">
						{!editState
							? "create new feedback"
							: `Editing '${editContent.title}'`}
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
						value={!editState ? titleValue : editTitleValue}
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

					{editState && (
						<EditInputSelect
							labelHtmlFor="updateStatus"
							labelTitle="update status"
							labelDescription="Change feedback state"
							activeText={activeTextEdit}
							activeClick={editActiveClick}
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
						value={!editState ? detailDescriptionValue : editDescriptionValue}
						inputClassName={descriptionClass}
						textAreaError={detailsDescriptionHasError}
					/>

					<div className="feedbackForm-form__btns">
						{editState && (
							<div className="feedbackForm-form__btns--delete">
								<Button
									btnText="Delete"
									btnNumber="4"
									onClick={deleteFeedbackHandler}
								/>
							</div>
						)}
						<div className="feedbackForm-form__btns--actions">
							<Button
								btnText="Cancel"
								btnNumber="3"
								onClick={cancelEditHandler}
							/>
							<Button btnText="Add Feedback" btnNumber="1" />
						</div>
					</div>
				</form>
			</div>
			{feedbackToDelete && (
				<Modal id={editContent._id} title={editContent.title} />
			)}
			{feedbackToDelete && <Backdrop />}
		</section>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		userToken: state.authenticationReducer.token,
		editState: state.productFeedbackReducer.edit,
		editContent: state.productFeedbackReducer.editContent,
		feedbackToDelete: state.productFeedbackReducer.getFeedbackToDelete,
	};
};

export default connect(mapStateToProps)(NewFeedbackForm);
