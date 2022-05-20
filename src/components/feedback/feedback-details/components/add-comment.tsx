import React, { useState } from "react";

import useInput from "../../../../hooks/use-input";
import FormInput from "../../../input/input";
import Button from "../../../button/button";

function AddComment() {
	let isValid = false;

	const {
		value,
		inputBlurHandler,
		commentChangeHandler,
		resetUserInput,
		hasError,
		isValueValid,
		charactersLeft,
	} = useInput((value) => value.trim() !== "" && value.length >= 5);

	if (isValueValid) isValid = true;

	const submitFormHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!isValid) {
			inputBlurHandler();
			return;
		}

		const commentInput: { input: string } = { input: value };
		console.log(commentInput);
		resetUserInput();
	};

	const addCommentClassname = !hasError
		? "feedbackForm-form__control"
		: "feedbackForm-form__control feedbackForm-form__control--invalid";

	let charLeftText;

	charactersLeft === 1
		? (charLeftText = "Character left")
		: charactersLeft === 0
		? (charLeftText = "Characters finished")
		: (charLeftText = "Characters Left");

	return (
		<div className="addcomment">
			<h2 className="addcomment-heading">Add Comment</h2>
			<form onSubmit={submitFormHandler}>
				<FormInput
					control="textarea"
					name="userComment"
					id="add-comment"
					placeholder="Type your comment here"
					onChange={commentChangeHandler}
					onBlur={inputBlurHandler}
					value={value}
					maxLength={250}
					inputClassName={addCommentClassname}
					textAreaError={hasError}
				/>

				<div className="addcomment-actions">
					<p className="addcomment-actions__wordcount">
						<span>{charactersLeft !== 0 ? charactersLeft : ""}</span>{" "}
						<span>{charLeftText}</span>
					</p>

					<Button btnNumber="1" btnText="Post Comment" />
				</div>
			</form>
		</div>
	);
}

export default AddComment;
