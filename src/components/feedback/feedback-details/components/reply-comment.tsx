import React from "react";

import FormInput from "../../../input/input";
import Button from "../../../button/button";

interface ReplyCommentProps {
	commentNumber: number;
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
					name="replyComment"
					id="reply-comment"
					inputClassName={userInputClassname}
					value={props.value}
					onBlur={props.onBlur}
					onChange={props.onChangeHandler}
					textAreaError={props.hasError}
				/>
				<Button btnNumber="1" btnText="Post Reply" />
			</form>
		</div>
	);
}

export default ReplyComment;
