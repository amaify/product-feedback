import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";

import useInput from "../../../../hooks/use-input";
import FormInput from "../../../input/input";
import Button from "../../../button/button";

import { RootState } from "../../../../type";
import { addComment } from "../../../../store/utils/commentUtil";

interface Props {
	product: any;
	userToken: string;
}

function AddComment({ product, userToken }: Props) {
	let isValid = false;
	const dispatch = useDispatch();

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

		const commentInput: { content: string } = { content: value };
		console.log(commentInput);
		dispatch(addComment(product._id, userToken, commentInput));
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
					name="content"
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

const mapStateToProps = (state: RootState) => {
	return {
		userToken: state.authenticationReducer.token,
	};
};

export default connect(mapStateToProps)(AddComment);
