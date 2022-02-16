import React from "react";
import FormInput from "../../../forms/input/input";
import Button from "../../../button/button";

interface ReplyCommentProps {
	postReply: () => void;
	commentNumber: number;
}

function ReplyComment(props: ReplyCommentProps) {
	const inputChangeHandler = () => {};
	return (
		<div
			className={`${
				props.commentNumber > 1
					? "comments-comment__contents--replyComment comments-comment__contents--replyComment-more"
					: "comments-comment__contents--replyComment"
			}`}
		>
			{/* <form> */}
			<FormInput
				control="textarea"
				name="replyComment"
				id="reply-comment"
				// onChange={inputChangeHandler}
			/>
			<Button btnNumber="1" btnText="Post Reply" onClick={props.postReply} />
			{/* </form> */}
		</div>
	);
}

export default ReplyComment;
