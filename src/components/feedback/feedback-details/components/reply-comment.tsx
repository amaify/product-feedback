import React from "react";
import { connect } from "react-redux";

import FormInput from "../../../input/input";
import Button from "../../../button/button";
import { RootState } from "../../../../type";

interface ReplyCommentProps {
	commentNumber: string | number;
	submitFormHandler?: (event: React.FormEvent) => void;
	onChangeHandler?: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onBlur?: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	hasError?: boolean;
	isValueValid?: boolean;
	resetInput?: () => void;
	value?: string;
	addCommentLoading: boolean;
}

function ReplyComment(props: ReplyCommentProps) {
	const userInputClassname = !props.hasError
		? "feedbackForm-form__control"
		: "feedbackForm-form__control feedbackForm-form__control--invalid";

	return (
		<div
			className={`${
				props.commentNumber > 1
					? "comments-comment__contents--replyComment comments-comment__contents--replyComment-more"
					: "comments-comment__contents--replyComment"
			}`}
		>
			<form onSubmit={props.submitFormHandler}>
				<FormInput
					control="textarea"
					name="content"
					id="reply-comment"
					inputClassName={userInputClassname}
					value={props.value}
					onBlur={props.onBlur}
					onChange={props.onChangeHandler}
					textAreaError={props.hasError}
					maxLength={250}
				/>
				<Button
					btnNumber="1"
					btnText={props.addCommentLoading ? "Posting..." : "Post Reply"}
				/>
			</form>
		</div>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		addCommentLoading: state.commentReducer.addCommentLoading,
	};
};

export default connect(mapStateToProps)(ReplyComment);
